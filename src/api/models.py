from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects import postgresql
from werkzeug.security import generate_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__: "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(), unique=True, nullable=False)
    _password = db.Column(db.String(), unique=False, nullable=False)
    username = db.Column(db.String(), unique=True, nullable=False)
    _is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)

    def __repr__(self):
        return f'The user is {self.username}'

    def to_dict(self):
        return {
            "id": self.id,
            "email":self.email,
            "username": self.username,
            # do not serialize the password, its a security breach
        }
    
    def create(self):
        db.session.add(self)
        db.session.commit()
        return self
    
    @classmethod
    def get_all(cls):
        all_users= cls.query.all()
        return all_users
    
    @classmethod
    def get_by_email(cls,email):
        user = cls.query.filter_by(email=email).one_or_none()
        return user