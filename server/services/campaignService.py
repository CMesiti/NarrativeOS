from models import Campaigns, campaign_to_dict
from services.util import ServiceError
from config.db import db #import db variable
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request


class CampaignService():

    def get_campaigns():
        pass
    
    
    def register_new_campaign(self, campaign_data):
        title = campaign_data.get("title", None)
        description = campaign_data.get("description", None) #not required
        if not title:
            raise
        if verify_jwt_in_request:
            current_user = get_jwt_identity()
        else:
            raise ServiceError("Unauthorized Access")
        #create new object
        campaign = Campaigns(title=title, description=description, created_by=current_user)
        #we use flask sql alchemy statements or 
        #execute ORM statements with session.scalars or execute 
        #scalars are 'ORM Objects' and execute are row objects
        db.session.add(campaign)
        db.session.commit()
        return [campaign_to_dict(campaign)]
    
    
    def update_existing_campaign(self, updates, campaign_id):
        title = updates.get("title", None)
        description = updates.get("description", None)
        if verify_jwt_in_request():
            current_user = get_jwt_identity()
        else:
            raise ServiceError("Unauthorized Access")
        campaign = db.session.get(Campaigns, campaign_id) 
        if campaign.created_by != current_user:
            raise ServiceError("Unauthorized Access")
        if title:
            campaign.title = title
        if description:
            campaign.description = description
        db.session.commit()
        return [campaign_to_dict(campaign)]

    def delete_existing_campaign(campaign_id):
        pass
