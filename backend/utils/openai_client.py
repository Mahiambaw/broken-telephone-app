from openai import OpenAI
from .config import get_nebius

def get_openai_client():
    return OpenAI(
        base_url="https://api.studio.nebius.ai/v1/",
        api_key=get_nebius(),
    )