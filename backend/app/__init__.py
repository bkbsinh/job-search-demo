from flask import Flask
from database.db import db
from database.models import *
from app.api import api
from app.protected import protected
from app.dev import dev_router
from flask_cors import CORS
from settings import JWT_SECRET


def init_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///my_db.db'
    app.config['SECRET_KEY'] = JWT_SECRET

    app.register_blueprint(api)
    app.register_blueprint(dev_router)
    app.register_blueprint(protected, url_prefix='/pr')

    db.init_app(app)
    
    with app.app_context():
        db.create_all()

    return app