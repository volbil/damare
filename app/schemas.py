from starlette.requests import Request as StarletteRequest
from starlette.datastructures import ImmutableMultiDict
from pydantic import BaseModel, ConfigDict
from wtforms import Form, ValidationError
import asyncio


class CustomModel(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
    )


class CustomForm(Form):
    def __init__(self, request: StarletteRequest, *args, **kwargs):

        # cache request
        self._request = request

        super().__init__(*args, **kwargs)

    @classmethod
    async def from_formdata(
        cls, request: StarletteRequest, formdata=object(), **kwargs
    ):
        if request.method in ["POST", "PUT", "PATCH", "DELETE"]:
            if request.headers.get("content-type") == "application/json":
                formdata = ImmutableMultiDict(await request.json())
            else:
                formdata = await request.form()

        else:
            formdata = None

        return cls(request, formdata=formdata, **kwargs)

    async def _validate_async(self, validator, field):
        try:
            await validator(self, field)
        except ValidationError as e:
            field.errors.append(e.args[0])
            return False
        return True

    async def validate(self, extra_validators=None):
        """Overload :meth:`validate` to handle custom async validators"""
        if extra_validators is not None:
            extra = extra_validators.copy()
        else:
            extra = {}

        async_validators = {}

        # use extra validators to check for StopValidation errors
        completed = []

        def record_status(_, field):
            completed.append(field.name)

        for name, field in self._fields.items():
            func = getattr(self.__class__, f"async_validate_{name}", None)
            if func:
                async_validators[field.name] = (func, field)
                extra.setdefault(name, []).append(record_status)

        # execute non-async validators
        success = super().validate(extra_validators=extra)

        # execute async validators
        tasks = [
            self._validate_async(*async_validators[field_name])
            for field_name in completed
        ]
        async_results = await asyncio.gather(*tasks)

        # check results
        if False in async_results:
            success = False

        return success

    def is_submitted(self):
        return self._request.method in ["POST", "PUT", "PATCH", "DELETE"]

    async def validate_on_submit(self, extra_validators=None):
        return self.is_submitted() and await self.validate(
            extra_validators=extra_validators
        )
