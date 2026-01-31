from flask import request, jsonify, Flask, Blueprint
import requests
from flask_jwt_extended import jwt_required


campaigns_bp = Blueprint("campaigns", __name__, "/campaigns/v1/")
#Lets try a different method. This endpoint will group operations together, 


#we can't group operations that require url parameters, also this makes it less readable
@jwt_required
@campaigns_bp.route("/")
def get_user_campaigns():
    #get all campaings for that user
    #call user service, then use the JWT to get users with that id.
    pass

@jwt_required
@campaigns_bp.route("/", methods=["POST"])
def create_campaign():
    pass

@jwt_required
@campaigns_bp.route("/<uuid:user_id>", methods=["PUT"])
def update_campaign():
    pass

@jwt_required
@campaigns_bp.route("/<uuid:user_id>", methods=["DELETE"])
def delete_campaign():
    pass