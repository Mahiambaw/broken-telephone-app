from io import BytesIO
import base64
import json
from PIL import Image
import uuid
from utils.image_cache import image_cache



class BrokenTelephone:
    def __init__(self, text:str, client):
        self.text = text
        self.client = client

    def text_to_image(self):
        response = self.client.images.generate(
            model="black-forest-labs/flux-dev", 
            response_format="b64_json",
            extra_body={
                "response_extension": "png",
                "width": 1024,
                "height": 1024,
                "num_inference_steps": 28,
                "negative_prompt": "",
                "seed": -1
            },
            prompt=self.text
        )
        response_json = response.to_json()
        return response_json
        

    def image_converter(self, response_json: str) -> Image.Image:
        response_data = json.loads(response_json)
        b64_image = response_data['data'][0]['b64_json']
        image_bytes = base64.b64decode(b64_image)
        image = Image.open(BytesIO(image_bytes))
        return image


    def image_to_text(self, image: Image.Image) -> str:
        buffered = BytesIO()
        image.save(buffered, format="PNG")
        buffered.seek(0) 
        b64_image = base64.b64encode(buffered.read()).decode()
        completion = self.client.chat.completions.create(
            model="Qwen/Qwen2-VL-72B-Instruct",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Please describe this image."},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/png;base64,{b64_image}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=300
        )

        self.text = completion.choices[0].message.content
        print(self.text)
        return self.text


    def play(self, n_rounds: int) -> list[dict]:
        results = []

        for i in range(n_rounds):
            image_json = self.text_to_image()
            img = self.image_converter(image_json)
            self.text = self.image_to_text(img)

            # Save image in memory, return URL
            buffered = BytesIO()
            img.save(buffered, format="PNG")
            image_bytes = buffered.getvalue()

            image_id = str(uuid.uuid4())
            image_cache[image_id] = image_bytes

            results.append({
                "round": i + 1,
                "text": self.text,
                "image_url": f"/image/{image_id}"
            })

        return results
