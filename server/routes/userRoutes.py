from flask import Blueprint, request, url_for, jsonify
from config.db import get_connection
from sqlalchemy import text, select, update, delete, insert
from sqlalchemy.orm import Session, selectinload
from models import Users, Campaigns, ModelBase, user_to_dict
from argon2 import PasswordHasher, exceptions

#blueprint syntax, name, where it's defined, and url_prefix, versioning 1 of bp
users_bp = Blueprint("users", __name__, url_prefix = "/users/v1")


@bp.route("/")
def get_users():
    response = {"Users":[],"Message":""}
    try:
        with Session(db) as session:
            #this is a eager loading technique solving the N+1 Query problem
            stmt = select(Users).options(selectinload(Users.campaigns))
            #scalars returns list of objs and execute returns list of rows
            users_ls = session.scalars(stmt).all()
            for user in users_ls:
                response["Users"].append(user_to_dict(user))
        response["Message"] = "GET Successful"
        print(response)
        return jsonify({"Data":response}), 200
    

    except Exception as e:
        response["Message"] = f"GET ERROR, {e}"
        return jsonify({"ERROR":response}), 400