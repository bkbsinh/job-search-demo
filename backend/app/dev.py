"""
    This script contains all routes for setting up DB / testing purpose
    thus needs to be separated from the main routers
"""


from database.models import User, Job
from database.db import db
from utils.processing import process_all_jobs
from utils.fetch import job_search
from utils.crud import insert_bulk_data
from flask import Blueprint, jsonify, request
import logging
import json
import uuid
from operator import itemgetter


dev_router = Blueprint('dev', __name__)

logger = logging.getLogger(__name__)


@dev_router.route('/db/test')
def get_user():
    name = request.args.get("name")
    try:
        user = User.query.filter_by(name=name).first()

        return jsonify({"user_id": f"{user.id}"}), 200
    except Exception as e:
        return jsonify({"message": f"Error retrieving user: {repr(e)}"}), 500


@dev_router.route('/db/user')
def insert_system_user():
    try:
        system_user1 = User(id=str(uuid.uuid4()), name="System User 1", email="bkb@gmail1.de", credential="cred", password="200894")
        system_user2 = User(id=str(uuid.uuid4()), name="System User 2", email="bkb@gmail2.de", credential="cred", password="200894")
        system_user3 = User(id=str(uuid.uuid4()), name="System User 3", email="bkb@gmail3.de", credential="cred", password="200894")
        system_user4 = User(id=str(uuid.uuid4()), name="System User 4", email="bkb@gmail4.de", credential="cred", password="200894")
        system_user5 = User(id=str(uuid.uuid4()), name="System User 5", email="bkb@gmail5.de", credential="cred", password="200894")
        system_user6 = User(id=str(uuid.uuid4()), name="System User 6", email="bkb@gmail6.de", credential="cred", password="200894")
        system_user7 = User(id=str(uuid.uuid4()), name="System User 7", email="bkb@gmail7.de", credential="cred", password="200894")
        system_user8 = User(id=str(uuid.uuid4()), name="System User 8", email="bkb@gmail8.de", credential="cred", password="200894")
        system_user9 = User(id=str(uuid.uuid4()), name="System User 9", email="bkb@gmail9.de", credential="cred", password="200894")

        system_users = [system_user1, system_user2, system_user3, system_user4, system_user5, system_user6, system_user7, system_user8, system_user9]
        db.session.bulk_save_objects(system_users)
        db.session.commit()
        return jsonify({"msg": "Successful"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error added system user: {repr(e)}"}), 500
    

@dev_router.route('/db/new_user')
def insert_new_user():
    try:
        new_user = User(id=str(uuid.uuid4()), name="Test User", email="test@gmail.de", credential="cred", password="200894")
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": f"Successful: {new_user.to_dict()}"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error added new user: {repr(e)}"}), 500


@dev_router.route('/db/sjob')
def insert_job_static_data():
    with open("app/static/data/full_data.json", "r") as f:
        data = json.load(f)

    jobs = process_all_jobs(data)
    
    is_data_inserted = insert_bulk_data(jobs=jobs)
    if is_data_inserted:
        return jsonify({"msg": "Successfully inserted job data"}), 200
    return jsonify({"msg": "Failed to insert job data"}), 500
    

@dev_router.route('/db/djob')
def insert_job_dynamic_data():
    tag, location = itemgetter("position", "location")(request.args)
    data = job_search(
        what=tag, 
        where=location
    )

    if data.get("stellenangebote"):
        logger.debug(f"Found jobs: {len(data.get('stellenangebote'))}")
        jobs = process_all_jobs(data)

        is_data_inserted = insert_bulk_data(jobs=jobs)
        if is_data_inserted:
            return jsonify({"msg": "Successfully inserted job data"}), 200
        return jsonify({"msg": "Failed to insert job data"}), 500
    
    return jsonify({"msg": "OK. No jobs found"}), 200