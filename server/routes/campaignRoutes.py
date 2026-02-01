from flask import request, jsonify, Flask, Blueprint
import requests
from flask_jwt_extended import jwt_required
from services.campaignService import CampaignService
from services.util import ServiceError

campaigns_bp = Blueprint("campaigns", __name__, "/campaigns/v1/")
#Lets try a different method. This endpoint will group operations together, 


#we can't group operations that require url parameters, also this makes it less readable
@jwt_required
@campaigns_bp.route("/")
def get_user_campaigns():
    #get all campaings for that user
    #call user service, then use the JWT to get user id.
    #
    pass

@jwt_required
@campaigns_bp.route("/", methods=["POST"])
def register_campaign():
    try:
        #form info - title, description
        data = request.form
        service = CampaignService()
        campaign = service.register_new_campaign(data)
        return jsonify({"campaign_data": campaign}), 200
    except ServiceError as e:
        pass
    except Exception as e:
        pass

@jwt_required
@campaigns_bp.route("/<uuid:campaign_id>", methods=["PUT"])
def update_campaign(campaign_id):
    try:
        data = request.form
        service = CampaignService()
        updated_campaign = service.update_existing_campaign(campaign_id)
        return jsonify({"campaign_data":updated_campaign})
    except ServiceError as e:
        pass
    except Exception as e:
        pass


@jwt_required
@campaigns_bp.route("/<uuid:campaign_id>", methods=["DELETE"])
def delete_campaign(campaign_id):
    try:
        service = CampaignService
        removed_campaign = service.delete_existing_campaign(campaign_id)
        return jsonify({"campaign_data": removed_campaign})
    except ServiceError as e:
        pass
    except Exception as e:
        pass