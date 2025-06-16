from flask import Blueprint, send_file, abort
from io import BytesIO
from utils.image_cache import image_cache

image_bp = Blueprint("image_bp", __name__)

@image_bp.route("/image/<image_id>")
def serve_image(image_id):
    image_data = image_cache.get(image_id)
    if not image_data:
        abort(404)
    return send_file(BytesIO(image_data), mimetype="image/png")
