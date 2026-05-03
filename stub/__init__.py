"""Stub data package.

The actual fixture loading lives in :mod:`stub.loader` so that
``python -m stub.build`` can run without triggering a pickle load
(chicken-and-egg: the build script generates the pickle).

Application code imports from ``stub.loader`` (typically via the
``app.stub_data`` shim).
"""
