import random
import time

while True:
    temperature = round(random.uniform(24, 32), 1)
    humidity = round(random.uniform(50, 70), 1)
    moisture = round(random.uniform(10, 15), 1)
    quantity = 1000

    print({
        "temperature": temperature,
        "humidity": humidity,
        "moisture": moisture,
        "quantity": quantity
    })

    time.sleep(3)