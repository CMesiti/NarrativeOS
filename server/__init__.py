# from flask import Flask
# from flask_cors import CORS
# import os
# from dotenv import load_dotenv
# from routes import userRoutes, campaignRoutes, authRoutes


# #app factory, on import
# def create_app(test_config = None):
#     app = Flask(__name__)
#     CORS(app)
#     app.register_blueprint(userRoutes.users_bp)
#     app.register_blueprint(campaignRoutes.campaigns_bp)
#     app.register_blueprint(authRoutes.auth_bp)
#     return app
