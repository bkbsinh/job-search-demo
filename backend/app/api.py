"""
To make use of NextJS's caching feature, protected and public routes
are defined in separated routers.

This router contains all public routes, which return the same data
for every user.
"""


from database.models import User, Job
from database.db import db
from utils.auth import token_required
from flask import Blueprint, jsonify, request
import logging
import uuid
from operator import itemgetter


api = Blueprint('api', __name__)

logger = logging.getLogger(__name__)


@api.route('/')
def root():
    return jsonify({"message": "Hello World"}), 200


@api.route("/user", methods=["POST"])
def handle_user():
    user_name, user_email, user_credential = itemgetter("name", "email", "credential")(request.form)

    is_user_existed = User.query.filter_by(email=user_email.lower()).first()
    if is_user_existed:
        return jsonify({"user": is_user_existed.to_dict()}), 200
    
    try:
        new_user = User(
            id = str(uuid.uuid4()),
            name=user_name,
            email=user_email,
            credential=user_credential
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"user": new_user.to_dict()}), 201
    except Exception as e:
        logger.debug(f"Could not create user -> {repr(e)}")
        return jsonify({"msg": "Failed. Could not create user"}), 500


@api.route("/user_info")
@token_required
def get_user_data(current_user):
    if current_user:
        return jsonify({"user": current_user.to_dict()}), 200
    return jsonify({"msg": "Could not authorize user"}), 500 


@api.route("/check_user", methods=["POST"])
def check_logged_in_user():
    logger.debug(request.form.to_dict())
    email, pwd = itemgetter("email", "pwd")(request.form)
    is_user_valid = User.query.filter_by(email=email.lower()).filter_by(password=pwd).first()
    if not is_user_valid:
        return jsonify({"msg": "Wrong creedentials"}), 401
    return jsonify({"user": is_user_valid.to_dict()}), 200  


@api.route('/jobs')
def search_result():
    tag, location = itemgetter("position", "location")(request.args)
    logger.debug(f"{tag}, {location}")
    try:
        job_data = Job.query.all()
        jobs = [job for job in job_data if job.is_similar(tag, location)]
        data = [job.to_dict() for job in jobs]

        return jsonify(data), 200
    except Exception as e:
        logger.debug(f'Failed to fetch data from DB -> {repr(e)}')
        return jsonify({"msg": "Failed to fetch data"}), 500


@api.route("/job/<string:id>")
def get_job_detail(id):
    job_does_exist = Job.query.filter_by(id = id).first()
    if not job_does_exist:
        return jsonify({
            "msg": f"Job {id} not found"
        }), 404  
    return jsonify(job_does_exist.to_dict()), 200


@api.route("/upload", methods=["POST"])
def upload_file_test():
    try:
        data = request.files
        print("BOdy -> ", data)
        return jsonify({"msg": f"{data}"}), 201
    except Exception as e:
        return jsonify({"msg": f"{repr(e)}"}), 500