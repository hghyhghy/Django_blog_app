
import google.generativeai as genai
import  os
from  dotenv  import load_dotenv
from  pathlib import Path

env_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=env_path)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_article(topic:str) ->str:
    model =  genai.GenerativeModel("gemini-1.5-pro-002")
    prompt = f'Write concise article of about 100 words on the topic : {topic}'
    response  =  model.generate_content(prompt)
    return response.text.strip()