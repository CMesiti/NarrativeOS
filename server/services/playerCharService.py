from server.config.db import db
from server.services.util import ServiceError
from flask_jwt_extended import get_jwt_identity
from sqlalchemy import select
from server.models.playerCharModel import PlayerCharacters, pc_to_dict

class PlayerService:
    #get all player characters under a specific campaign
    def get_campaign_players(self, campaign_id):
        stmt = select(PlayerCharacters).where(PlayerCharacters.campaign_id == campaign_id)
        player_characters = db.session.scalars(stmt).all()
        #we need DTO for player character object
        return [pc_to_dict(pc) for pc in player_characters]
    
    def create_new_player(self, player_data, campaign_id):
        #validate player data
        name = player_data.get("character_name", None)
        level = player_data.get("character_level", None)
        classes = player_data.get("character_class", None)
        stats = player_data.get("character_stats", None)
        hitpoints = player_data.get("character_hitpoints", None)
        if not all(name, level, classes, stats, hitpoints):
            raise ServiceError("Missing required player fields.")
        current_user = get_jwt_identity()
        #check if already exists
        stmt = select(PlayerCharacters).where(PlayerCharacters.name == name)
        existing_player = db.session.scalars(stmt).first()
        if existing_player:
            raise ServiceError("Already Existing Character")
        new_player = PlayerCharacters(
            campaign_id = campaign_id,
            user_id = current_user, 
            character_name = name,
            character_level = level,
            character_class = classes,
            character_stats = stats,
            character_hitpoints = hitpoints
        )
        db.session.add(new_player)
        db.session.commit()
        return pc_to_dict(new_player)