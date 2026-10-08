import random
import time
import requests

while True:
    data = {
        "temperature": round(random.uniform(24, 32), 1),
        "humidity": round(random.uniform(50, 70), 1),
        "moisture": round(random.uniform(10, 20), 1),
        "quantity": 1000
    }

    print("Sensor Data:", data)

    try:
        response = requests.post(
            "http://localhost:5000/sensor",
            json=data
        )

        print("Server:", response.json())

    except Exception as e:
        print("Server not running:", e)

    time.sleep(5)