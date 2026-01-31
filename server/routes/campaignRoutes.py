from flask import request, jsonify, Flask, Blueprint
import requests
from flask_jwt_extended import jwt_required
campaigns_bp = Blueprint("campaigns", __name__, "/campaigns/v1/")
#Lets try a different method. This endpoint will group operations together, 


#we can't group operations that require url parameters, also this makes it less readable
@campaigns_bp.route("/", methods=["GET"])
def get_user_campaigns():
    #get all campaings for that user
    pass

@campaigns_bp.route("/", methods=["POST"])
def create_campaign():
    pass

@campaigns_bp.route("/<uuid:user_id>", methods=["PUT"])
@jwt_required
def update_campaign():
    pass

@campaigns_bp.route("/<uuid:user_id>", methods=["DELETE"])
@jwt_required
def delete_campaign():
    pass