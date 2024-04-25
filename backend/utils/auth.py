import jwt
from functools import wraps
from flask import request, jsonify
from settings import JWT_SECRET
from database.models import User
from database.db import db
from utils.crud import update_user
import uuid
import logging


logger = logging.getLogger(__name__)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401

        try:
            data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            logger.debug(data)
            current_user = update_user(data=data)

            if not current_user:
                return jsonify({'message': 'Could not update user'}), 500
            
            return  f(current_user, *args, **kwargs)
        except Exception as e:
            return jsonify({
                'message' : f'Token is invalid -> {repr(e)}'
            }), 401
  
    return decorated