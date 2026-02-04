from .db import db
from sqlalchemyseeder import ResolvingSeeder
#!refs is used to reference other table values for relationship constraints
def seed_db():
    seeder = ResolvingSeeder(db.session)
    seeder.load_entities_from_json_file("mock_data.json")
    db.session.commit()