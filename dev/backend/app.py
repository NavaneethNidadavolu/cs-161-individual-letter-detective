from flask import Flask


app = Flask(__name__)

@app.route("/")
def home():
    return "CS161 - Letter Detective Project (Navaneeth Sai Nidadavolu)"