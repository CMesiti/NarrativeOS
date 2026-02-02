from sqlalchemy.dialects.postgresql import  UUID, ENUM, TIMESTAMP
from models import ModelBase
from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import ForeignKey, func
from datetime import datetime
import uuid
import enum
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from models import Campaigns, Users
class Role(enum.Enum):
    DM = "DM"
    PLAYER = "Player"
    VIEWER = "VIEWER"

#classic many to many association table
class CampaignMembers(ModelBase):
    __tablename__ = "campaign_members"

    #declare table columns, dtypes, and mappings
    campaign_id:Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("campaigns.campaign_id", ondelete="CASCADE"), primary_key=True)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True),ForeignKey("users.user_id", ondelete="CASCADE"), primary_key = True)
    user_role: Mapped[Role] = mapped_column(ENUM(Role, name = "USER_ROLE"))
    joined_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), server_default=func.current_timestamp())

    #many to 1
    user: Mapped["Users"] = relationship(
        "Users",
         back_populates="campaign_members",
         passive_deletes=True)
    #many to one
    campaign: Mapped["Campaigns"] = relationship(
        "Campaigns",
         back_populates="campaign_members", 
         passive_deletes=True) 
    


    def __repr__(self):
        return f"""
            campaign_id - {self.campaign_id}
            user_id - {self.user_id}
            user_role - {self.user_role}
            joined_at - {self.joined_at}
            """


def cm_to_dict(cpm_member:CampaignMembers):
    pass