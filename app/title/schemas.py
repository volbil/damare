from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired
from app.schemas import CustomForm


class CreateForm(CustomForm):
    synopsis = StringField(validators=[DataRequired("Будь ласка додайте опис")])
    title = StringField(validators=[DataRequired("Будь ласка введіть назву")])
    title_original = StringField(name="title-original")
    original = BooleanField(name="is-original")
    author = StringField()
    genres = StringField()
    year = IntegerField()
