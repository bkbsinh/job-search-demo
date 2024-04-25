from database.db import db
from datetime import datetime
from sqlalchemy.ext.hybrid import hybrid_method
from difflib import SequenceMatcher


user_job = db.Table(
    'user_job',
    db.Column('user_id', db.String, db.ForeignKey('user.id')),
    db.Column('job_id', db.String, db.ForeignKey('job.id')),
)


class User(db.Model):
    __table_name = 'user'
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    profile = db.Column(db.String, default="default.avif")
    resume = db.Column(db.String, default=None)
    intro = db.Column(db.String, default=None)

    # Either "cred" or "google"
    credential = db.Column(db.String, nullable=False)

    # Password can be null if using Google credentials
    password = db.Column(db.String)

    # Many to many relationship with Job table
    saved_jobs = db.relationship('Job', secondary=user_job, back_populates='interested_by')

    # One to many relationship with Job table
    posted_jobs = db.relationship('Job', backref='autor')

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    def __repr__(self) -> str:
        return f'<User {self.id}>'
    
    
    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'credential': self.credential,
            'profile': self.profile,
            'resume': self.resume,
            'savedJobs': self.saved_jobs,
            'postedJobs': self.posted_jobs
        }


class Job(db.Model):
    __table_name = 'job'
    id = db.Column(db.String, primary_key=True)
    title = db.Column(db.String, nullable=False)
    employer = db.Column(db.String, nullable=False)
    tag = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    salary = db.Column(db.Integer, nullable=False, default=40000)
    remote = db.Column(db.Boolean, default=False)
    street = db.Column(db.String, default=None)
    plz = db.Column(db.String, default=None)
    public_date = db.Column(db.String, default=None)
    public_url = db.Column(db.String, default=None)
    reference_nr = db.Column(db.String, default=None)
    start_date = db.Column(db.String, default=None)
    autor_id = db.Column(db.String, db.ForeignKey("user.id"))

    # Many to many relationship with User table
    interested_by = db.relationship('User', secondary=user_job, back_populates='saved_jobs')

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    @hybrid_method
    def is_similar(self, input_job, input_location):
        return (SequenceMatcher(None, self.tag, input_job).ratio() > 0.6) & (SequenceMatcher(None, self.location, input_location).ratio() > 0.9)


    @is_similar.expression
    def is_similar(cls, input_job, input_location):
        return (SequenceMatcher(None, cls.tag, input_job).ratio() > 0.6) & (SequenceMatcher(None, cls.location, input_location).ratio() > 0.8)


    def __repr__(self) -> str:
        return f'<Job {self.id}>'
    
    
    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'title': self.title,
            'location': self.location,
            'employer': self.employer,
            'plz': self.plz,
            'salary': self.salary,
            'remote': self.remote,
            'street': self.street,
            'publicDate': self.public_date,
            'publicUrl': self.public_url,
            'tag': self.tag,
            'referenceNr': self.reference_nr,
            'startDate': self.start_date,
            'interestedBy': self.interested_by
        }