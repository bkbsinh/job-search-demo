"""
This router contains all protected routes requiring an encrypted 
access token in request header, which disables the fetch's caching.

An access token is a JWT including user data, particularly email & name 
"""


from database.db import db
from utils.auth import token_required
from utils.mailing import send_email

from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename
from operator import itemgetter
import logging
import os
import time


protected = Blueprint('protected', __name__)

logger = logging.getLogger(__name__)

STATIC_FOLDER = "app/static"


def create_user_folder(user_id: str) -> None:
    folder_path = os.path.join(STATIC_FOLDER, user_id)
    if os.path.isdir(folder_path):
        return
    os.mkdir(folder_path)


def upload_file(user_id: str, file_type: str) -> str:
    try:
        create_user_folder(user_id)
        uploaded_file = request.files[file_type]
        # file_name = file_type + "." + uploaded_file.filename.split(".")[-1]
        file_name = secure_filename(uploaded_file.filename)
        save_path = os.path.join(STATIC_FOLDER, user_id, file_name)
        uploaded_file.save(save_path)
        return file_name
    except Exception as e:
        logger.debug(f"Could not save file -> {repr(e)}")
        return ""


@protected.route("/user/img", methods=["POST"])
@token_required
def upload_profile_image(current_user):
    logger.debug(f"Before updating: {current_user.profile}")
    user_id = current_user.id
    uploaded_file_name = upload_file(user_id=user_id, file_type="profile")
    
    if uploaded_file_name:
        current_user.profile = uploaded_file_name
        db.session.commit()
        return jsonify({"file": uploaded_file_name}), 201

    return jsonify({"msg": f"Error uploading profile image for user {user_id}"}), 500


@protected.route("/user/img", methods=["DELETE"])
@token_required
def remove_profile_image(current_user):    
    if current_user:
        current_user.profile = "default.avif"
        db.session.commit()
        logger.debug(current_user.profile)
        return jsonify({"file": "Successfully removed profile image -> using default.avif"}), 200

    return jsonify({"msg": f"Error removing profile image for user {current_user.id}"}), 500


@protected.route("/user/cv", methods=["POST"])
@token_required
def upload_resume(current_user):
    user_id = current_user.id
    uploaded_file_name = upload_file(user_id=user_id, file_type="resume")
    
    if uploaded_file_name:
        current_user.resume = uploaded_file_name
        db.session.commit()
        logger.debug(current_user.resume)
        return jsonify({"file": uploaded_file_name}), 201

    return jsonify({"msg": f"Error uploading CV for user {user_id}"}), 500


@protected.route("/apply", methods=["POST"])
@token_required
def apply_job(current_user):
    try:
        logger.debug(f"Sending mail for current user -> {current_user}")
        msg, job_id = itemgetter("msg", "jobId")(request.form)
        send_email(
            subject=f"Application for Job {job_id}",
            body=msg,
            user_id=current_user.id
        )
        logger.debug("Successfully applied")
        return jsonify({"msg": "Successfully applied"}), 200
    except Exception as e:
        logger.debug(f"Error sending mail -> {repr(e)}")
        return jsonify({"msg": "Failed"}), 500