import time
import random
import requests

BACKEND_URL = "http://localhost:5000/api/telemetry"

temperature = 29.5
humidity = 64.0
grain_moisture = 20.5
farmer_wallet = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"

print("🌾 Launching Virtual IoT Paddy Moisture & Environmental Sensor...")

step = 0
while True:
    step += 1
    temperature += random.uniform(-0.1, 0.1)
    humidity += random.uniform(-0.2, 0.2)
    
    if grain_moisture > 13.5:
        grain_moisture -= random.uniform(0.2, 0.4)
    else:
        grain_moisture = 13.5 + random.uniform(-0.05, 0.05)

    payload = {
        "warehouseId": "GODOWN_COIMBATORE_01",
        "batchId": "BATCH_PADDY_2026",
        "farmerAddress": farmer_wallet,
        "telemetry": {
            "temperature": round(temperature, 2),
            "humidity": round(humidity, 2),
            "grainMoisture": round(grain_moisture, 2),
            "timestamp": int(time.time() * 1000)
        }
    }

    try:
        res = requests.post(BACKEND_URL, json=payload)
        data = res.json()
        print(f"[Telemetry #{step}] Moisture: {payload['telemetry']['grainMoisture']}% | Minted: {data.get('isMinted')}")
    except Exception as e:
        print(f"❌ Backend connection error: {e}")

    time.sleep(2)