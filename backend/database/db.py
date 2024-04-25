from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from settings import IS_DB_CREATED


class Base(DeclarativeBase):
  pass


db = SQLAlchemy(model_class=Base)