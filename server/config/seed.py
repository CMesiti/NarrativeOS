from main import create_app
from db import db
from services.util import hash_pass
from faker import Faker
from sqlalchemyseeder import ResolvingSeeder
#!refs is used to reference other table values for relationship constraints
def seed_db():
    seeder = ResolvingSeeder(db.session)
    new_ents = seeder.load_entities_from_json_file("mock_data.json")
    db.session.commit()