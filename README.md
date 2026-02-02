# NarrativeOS
Dungeon Master Assistant to help guide a DM through random encounters, NPC responses, and improving player experience with unique dynamic improvised encounters.

<img width="1551" height="901" alt="image" src="https://github.com/user-attachments/assets/18f13e75-6ebe-4435-ad77-4c176b0358b2" />

<img width="1553" height="899" alt="image" src="https://github.com/user-attachments/assets/f6c8d0ad-c25e-4102-90b6-37c63ba5adb6" />

<img width="1553" height="903" alt="image" src="https://github.com/user-attachments/assets/254a655b-1995-47fe-a0a6-44a65e99a580" />


---
# Development Backend Server

### Install uv Package Manager
[UV Installation](https://docs.astral.sh/uv/getting-started/installation/)


### Sync Environment Dependencies
- `cd server`
- `uv sync`

### Run main
- `macOS/Linux: export FLASK_APP=main.py.`
- `Windows (Command Prompt): set FLASK_APP=main.py.`
- `Windows (PowerShell): $env:FLASK_APP="main.py"`
- `flask run`

(Optional For Pip installations)
- `uv pip compile pyproject.toml -o requirements.txt`


## Database (Working on DB Migration Tool Implementation)

### Install PostgreSQL
[PostgreSQL Installation](https://www.postgresql.org/download/)

### Create Local DB
- `CREATE USER campaign_forge_app WITH PASSWORD 'local_password';`
- `CREATE DATABASE campaign_forge_dev OWNER campaign_forge_app;`

### Environment Variables
- `DATABASE_URL=postgresql+psycopg2://campaign_forge_app:local_password@localhost:5432/campaign_forge_dev`
