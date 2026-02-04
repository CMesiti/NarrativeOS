from flask import Blueprint
from flask_jwt_extended import jwt_required


pc_bp = Blueprint("pc_bp", __name__, url_prefix="/v1/player-character/")

#each player character action is related to a specific campaign

@pc_bp.route("/<uuid:campaign_id>")
@jwt_required()
def get_player_characters(campaign_id):
    pass


@pc_bp.route("/<uuid:campaign_id>", methods=["POST"])
@jwt_required()
def create_player_character(campaign_id):
    pass
    

@pc_bp.route("/<uuid:campaign_id>", methods=["PUT"])
@jwt_required()
def update_player_character(campaign_id):
    pass


@pc_bp.route("/<uuid:campaign_id>", methods=["DELETE"])
@jwt_required()
def delete_player_character(campaign_id):
    pass



#create, update, get, and delete player characters