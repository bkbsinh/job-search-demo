from database.models import User, Job
from database.db import db
import random
import uuid
import logging


logger = logging.getLogger(__name__)

LOCATIONS = [
        "Düsseldorf", "Frankfurt", "Berlin", "Aachen", "Bad Homburg", "Wiesbaden", "Köln", "Offenbach", "Hanau", "Hannover",
        "Hamburg", "Lüneburg", "Nordhausen", "Erfurt", "Leipzig", "Dresden", "Zwickau", "Thüringen", "Neu-Isenburg", "Oberthausen",
        "Friedberg", "Freiburg", "Stuttgart", "Bonn", "Mainz", "Dieburg", "Aschaffenburg"
    ]


def update_user(data: dict) -> User | None:
    current_user = User.query.filter_by(email = data.get("email")).first()

    if (current_user):
        logger.debug(f'Found user in DB -> {current_user.id}')
        return current_user

    try:
        new_user = User(
            id = str(uuid.uuid4()),
            email = data.get("email"),
            name = data.get("name"),
            credential = "google"
        )
        db.session.add(new_user)
        db.session.commit()
        logger.debug(f'Updated new user -> {new_user.email}')

        return new_user
    except Exception as e:
        db.session.rollback()
        logger.debug(f'Could not add new user -> {repr(e)}')

        return None


def insert_bulk_data(jobs: list) -> bool:
    system_users = User.query.filter_by(credential="cred").all()
    system_user_ids = [system_user.id for system_user in system_users]
    bulk_jobs = [
            Job(
                id = str(uuid.uuid4()),
                title = job.get("titel"),
                employer = job.get("arbeitgeber"),
                location = random.choice(LOCATIONS),
                remote = random.choice([True, False]),
                street = job.get("strasse"),
                plz = job.get("plz"),
                public_date = job.get("aktuelleVeroeffentlichungsdatum"),
                public_url = job.get("externeUrl"),
                tag = job.get("beruf"),
                reference_nr = job.get("refnr"),
                start_date = job.get("eintrittsdatum"),
                salary = random.randint(40000, 100000),
                autor_id = random.choice(system_user_ids)
            ) for job in jobs]
        
    try:
        db.session.bulk_save_objects(bulk_jobs)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False