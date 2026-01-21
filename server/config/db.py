from sqlalchemy import create_engine
from dotenv import load_dotenv
from flask import current_app, g
import os
from models import ModelBase

#This may need changes later, every connection request calls create_all()
load_dotenv()
def init_db():
    eng = get_connection()
    ModelBase.metadata.create_all(eng)

def get_connection():
    print("Creating Database Connection...")
    URL = os.getenv("DATABASE_URL")
    if "db" not in g:
        g.db = create_engine(URL)
    #commit as you go architecture
    return g.db