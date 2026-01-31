from flask import Blueprint, request, jsonify
from models import Users
from services.userService import UserService
from services.util import ServiceError
from flask_jwt_extended import jwt_required
#blueprint syntax, name, where it's defined, and url_prefix, versioning 1 of bp
users_bp = Blueprint("users", __name__, url_prefix = "/users/v1")

@users_bp.route("/")
def get_users():
    try:
        service = UserService()
        user_data = service.get_user_data()
        return jsonify({
            "user_data": user_data
            }), 200
    except ServiceError as e:
        return jsonify({
            "ERROR":str(e)
            }), 400
    except Exception as e:
        return jsonify({
            "ERROR":str(e)
            }), 500


@users_bp.route("/", methods=["POST"])
def register_user():
    data = request.get_json()
    try:
        service = UserService()
        user_created = service.register_new_user(data)
        return jsonify({
            "user_data": user_created
            }), 201
    except ServiceError as e:
        return jsonify({
            "ERROR":str(e)
            }), 400
    except Exception as e:
        return jsonify({
            "ERROR": str(e)
            }), 500

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.   
@jwt_required
@users_bp.route("/", methods = ["PUT"])
def update_user():
    #form is a dictionary, current user is user id in jwt
    data = request.form
    print(data)
    try:
        service = UserService()
        user_updated = service.update_existing_user(data)
        return jsonify({
            "user_data": user_updated
            }), 200
    except ServiceError as e:
        return jsonify(
            {"ERROR": str(e)
             }), 400
    except Exception as e:
        return jsonify(
            {"ERROR": str(e)
             }), 500

@jwt_required
@users_bp.route("/", methods=["DELETE"])
def remove_user():
    pswd = request.form.get("password", None)
    try:
        service = UserService()
        user_deleted = service.remove_existing_user(pswd)
        return jsonify({
            "user_data": user_deleted
            }), 200
    except ServiceError as e:
        return jsonify(
            {"ERROR": str(e)
             }), 400
    except Exception as e:
        return jsonify(
            {"ERROR": str(e)
             }), 500
    #add session auth, ensure current user request, and recieve password
