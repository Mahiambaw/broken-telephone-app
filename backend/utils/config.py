from dotenv import load_dotenv
import os
load_dotenv()
def get_nebius():
    return os.getenv("NEBIUS_API_KEY")
def get_openai():
    return os.getenv("OPENAI_API_KEY")