from flask import request, jsonify, Flask, Blueprint
import requests

campaigns_bp = Blueprint("campaigns", __name__, "/campaigns/v1/")
#Lets try a different method. This endpoint will group operations together, 


#we can't group operations that require url parameters, also this makes it less readable
@campaigns_bp.route("/", methods=["GET"])
def get_campaigns():
    pass


@campaigns_bp.route("/", methods=["POST"])
def create_campaign():
    pass