from config.db import init_db
from models import Users, Campaigns, ModelBase, user_to_dict
from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv
from routes import userRoutes, campaignRoutes, authRoutes

#app factory, on import
def create_app(test_config = None):
    app = Flask(__name__)
    CORS(app)
    #Since we use the g object we enable access to current app in configuration.
    with app.app_context():
        init_db()
    app.register_blueprint(userRoutes.users_bp)
    app.register_blueprint(campaignRoutes.campaigns_bp)
    app.register_blueprint(authRoutes.auth_bp)
    
    return app
app = create_app()
if __name__ == "__main__":
    app.run(debug=True)

