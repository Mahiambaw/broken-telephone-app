from flask import Flask
from flask_cors import CORS
from routes.generate import generate_bp
from routes.image import image_bp

app = Flask(__name__)
CORS(app)
app.register_blueprint(generate_bp, url_prefix="/api")
app.register_blueprint(image_bp)
@app.route("/")
def home():
    return "👋 Hello from the BrokenTelephone Flask backend!"


print("👋 Flask is about to run!")

if __name__ == "__main__":
    print("🚀 Flask is starting...")
    app.run(debug=True, port=5000)


