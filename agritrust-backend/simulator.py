import time
import requests

readings = [
    {"temperature": 29.2, "humidity": 68.0, "moisture": 18.5},
    {"temperature": 28.9, "humidity": 67.2, "moisture": 17.6},
    {"temperature": 28.6, "humidity": 66.4, "moisture": 16.8},
    {"temperature": 28.3, "humidity": 65.6, "moisture": 16.0},
    {"temperature": 28.0, "humidity": 64.8, "moisture": 15.3},
    {"temperature": 27.7, "humidity": 64.0, "moisture": 14.8},
    {"temperature": 27.4, "humidity": 63.2, "moisture": 14.4},
    {"temperature": 27.1, "humidity": 62.5, "moisture": 14.0},
]

for reading in readings:
    data = {**reading, "quantity": 1000}

    try:
        response = requests.post(
            "http://localhost:5000/sensor",
            json=data,
            timeout=10
        )
        response.raise_for_status()
        result = response.json()

        print(
            f"Temperature: {data['temperature']}°C | "
            f"Humidity: {data['humidity']}% | "
            f"Moisture: {data['moisture']}% | "
            f"Status: {result['status']}"
        )

        if result.get("status") == "SAFE":
            print("Paddy is SAFE. Monitoring stopped.")
            break

        time.sleep(5)

    except Exception as error:
        print("Sensor error:", error)
        break