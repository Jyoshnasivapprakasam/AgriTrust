"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Droplets,
  Thermometer,
  ShieldCheck,
} from "lucide-react";

import SensorChart from "@/components/SensorChart";

type SensorData = {
  time: string;
  moisture: number;
  temperature: number;
  humidity: number;
};

export default function Home() {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  const [currentData, setCurrentData] = useState({
    moisture: 16.5,
    temperature: 29.4,
    humidity: 68,
  });

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/sensor"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch sensor data");
        }

        const data = await response.json();

        const newData = {
          time: new Date().toLocaleTimeString(),
          moisture: Number(data.moisture),
          temperature: Number(data.temperature),
          humidity: Number(data.humidity),
        };

        setCurrentData({
          moisture: newData.moisture,
          temperature: newData.temperature,
          humidity: newData.humidity,
        });

        setSensorData((previous) => {
          const updated = [...previous, newData];

          return updated.slice(-20);
        });
      } catch (error) {
        console.error("Sensor API error:", error);
      }
    };

    fetchSensorData();

    const interval = setInterval(fetchSensorData, 2000);

    return () => clearInterval(interval);
  }, []);

  const isSafe = currentData.moisture <= 14;

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              AgriTrust
            </h1>

            <p className="text-sm text-gray-500">
              Smart Paddy Storage & Pledge Financing
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-green-600">
            <Activity size={18} />
            System Online
          </div>

        </div>
      </header>


      {/* Dashboard */}
      <div className="mx-auto max-w-7xl px-6 py-8">

        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Storage Dashboard
          </h2>

          <p className="mt-1 text-gray-500">
            Monitor your stored paddy in real time.
          </p>
        </div>


        {/* Sensor Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Moisture */}
          <div className="rounded-xl bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Paddy Moisture
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {currentData.moisture.toFixed(1)}%
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-3">
                <Droplets
                  className="text-blue-600"
                  size={24}
                />
              </div>

            </div>

          </div>


          {/* Temperature */}
          <div className="rounded-xl bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Temperature
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {currentData.temperature.toFixed(1)}°C
                </p>
              </div>

              <div className="rounded-lg bg-orange-50 p-3">
                <Thermometer
                  className="text-orange-600"
                  size={24}
                />
              </div>

            </div>

          </div>


          {/* Humidity */}
          <div className="rounded-xl bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Humidity
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {currentData.humidity.toFixed(1)}%
                </p>
              </div>

              <div className="rounded-lg bg-purple-50 p-3">
                <Droplets
                  className="text-purple-600"
                  size={24}
                />
              </div>

            </div>

          </div>

        </div>


        {/* Live Chart */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

          <div className="mb-5">

            <h3 className="text-xl font-semibold text-gray-900">
              Live Storage Telemetry
            </h3>

            <p className="text-sm text-gray-500">
              Sensor readings update every 2 seconds.
            </p>

          </div>

          <SensorChart data={sensorData} />

        </div>


        {/* Storage Status */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div
              className={`rounded-lg p-3 ${
                isSafe
                  ? "bg-green-100"
                  : "bg-yellow-100"
              }`}
            >
              <ShieldCheck
                className={
                  isSafe
                    ? "text-green-600"
                    : "text-yellow-600"
                }
                size={24}
              />
            </div>

            <div>

              <h3 className="font-semibold text-gray-900">
                Storage Status
              </h3>

              {isSafe ? (
                <p className="text-green-600">
                  🟢 Safe & e-NWR Minted
                </p>
              ) : (
                <p className="text-yellow-600">
                  🟡 Drying in Progress
                </p>
              )}

            </div>

          </div>

        </div>


        {/* How it Works */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

          <h3 className="text-lg font-semibold text-gray-900">
            How AgriTrust Works
          </h3>

          <div className="mt-5 grid gap-5 md:grid-cols-4">

            <div>
              <p className="font-semibold text-gray-900">
                01. Paddy Intake
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Manager records the incoming paddy.
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                02. Monitor
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Sensors continuously monitor storage.
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                03. e-NWR
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Safe paddy receives a digital receipt.
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                04. Loan
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Farmer can apply for financing.
              </p>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}