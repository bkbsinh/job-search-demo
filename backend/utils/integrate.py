from backend.database.db import db
from backend.database.models import Job, User
from fetch import job_search
from processing import process_all_jobs
import json
import uuid


def load_job_data_from_json(file_path: str) -> dict:
    try:
        with open(file_path, "r") as f:
            data = json.load(f)

        return data
    except Exception as e:
        print(f"Could not load data from file -> {repr(e)}")
        return {}
    

def insert_job_data_to_db():
    data = load_job_data_from_json("app/data.json")

    if not data:
        print("Data is empty")
        return False
    
    jobs = process_all_jobs(data.get("stellenangebote"))

    bulk_jobs = [
        Job(
            id = uuid.uuid4(),
            title = job.get("titel"),
            employer = job.get("arbeitgeber"),
            location = job.get("ort"),
            street = job.get("street"),
            plz = job.get("plz"),
            public_date = job.get("aktuelleVeroeffentlichungsdatum"),
            public_url = job.get("externeUrl"),
            tags = job.get("beruf"),
            reference_nr = job.get("refnr"),
            start_date = job.get("eintrittsdatum")
        ) for job in jobs]
    
    try:
        db.session.bulk_save_objects(bulk_jobs)
        return True
    except Exception as e:
        print("Could not insert bulk")
        db.session.rollback()
        return False

def main():
    print("Start inserting data...")
    is_data_inserted = insert_job_data_to_db()
    if is_data_inserted:
        print("Successfully inserted data into DB")
    else:
        print("Failed to insert data into DB")


if __name__ == "__main__":
    main()