from sqlalchemy import text, select, update, delete, insert
from sqlalchemy.orm import Session, selectinload
from models import Users, ModelBase, user_to_dict
from config.db import get_connection

#class holds CRUD
class UserService:
    def __init__(self):
        self.db = get_connection()
    def get_user_data(self):
        with Session(self.db) as session:
            #this is a eager loading technique solving the N+1 Query problem
            stmt = select(Users).options(selectinload(Users.campaigns))
            #scalars returns list of objs and execute returns list of rows
            users_ls = session.scalars(stmt).all()
        return [user_to_dict(user) for user in users_ls]

        