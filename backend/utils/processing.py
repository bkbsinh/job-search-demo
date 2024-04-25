import logging


def process_single_job(job: dict) -> dict:
    """Processing an individual job to extract all related information"""
    related_fields = [
        "aktuelleVeroeffentlichungsdatum",
        "titel",
        "arbeitgeber",
        "beruf",
        "refnr",
        "externeUrl",
        "eintrittsdatum"
    ]
    
    job_data = {f"{field}": job.get(field) if job.get(field) else "" for field in related_fields}

    address = job.get("arbeitsort")
    processed_address = {
        "ort": address.get("ort") if address.get("ort") else "",
        "plz": address.get("plz") if address.get("plz") else "",
        "strasse": address.get("strasse") if address.get("strasse") else "",
    }

    job_data.update(processed_address)

    return job_data


def process_all_jobs(data: dict) -> list:
    jobs = data.get("stellenangebote")
    logging.debug(f"Total jobs found: {len(jobs)}")

    jobs_data = [process_single_job(job) for job in jobs]

    return jobs_data