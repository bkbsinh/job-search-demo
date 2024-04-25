from flask import request


def validate_user():
    headers = request.headers
    if ""