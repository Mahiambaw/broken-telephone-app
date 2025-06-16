from flask import Blueprint, request, jsonify
from utils.openai_client import get_openai_client
from services.broken_telephone import BrokenTelephone



generate_bp = Blueprint("generate_bp", __name__)

@generate_bp.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    prompt = data.get("prompt", "")
    rounds = data.get("round", 1)
    client = get_openai_client()
    game = BrokenTelephone(prompt, client)
    result = game.play(rounds)
    print(result)
    return jsonify({"result": result})