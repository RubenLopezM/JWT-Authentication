"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy import exc
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def create_user():

    email = request.json.get("email", None)
    password = request.json.get("password", None)
    username = request.json.get("username", None)

    if not (email or password or username):
        return {'error': 'Missing info'}, 400

    
    new_user = User(
        email=email, 
        _is_active=True,
        _password=generate_password_hash(password, method='pbkdf2:sha256', salt_length=16),
        username=username
    )
    
    try:
        print('Ther user is',new_user)
        new_user.create()
        token = create_access_token(identity=new_user.to_dict(), expires_delta=timedelta(minutes=100))
        return jsonify({'token': token, 'user': new_user.to_dict()}), 200
   
    except exc.IntegrityError as err:
        return {'error': 'Something went wrong'}, 401
        

@api.route('/user', methods=['GET'])
def get_users():

    users= User.get_all()
    users=[user.to_dict() for user in users]
    return jsonify(users), 200

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if email and password:
        user = User.get_by_email(email)
        print('The user', user)
        
        if user and check_password_hash(user._password, password) and user._is_active:
            access_token = create_access_token(identity=user.to_dict(), expires_delta=timedelta(minutes=100))
            return {'token': access_token}, 200

        return jsonify({'error':'Not found'}), 200

    return {'error': 'Some parameter is wrong'}, 401