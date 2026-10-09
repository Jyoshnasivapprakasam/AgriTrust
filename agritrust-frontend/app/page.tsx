"use client";

import { useEffect, useState } from "react";

type SensorData = {
  temperature: number;
  humidity: number;
  moisture: number;
  quantity: number;
  status: string;
};

type HistoryData = {
  id: number;
  temperature: number;
  humidity: number;
  moisture: number;
  quantity: number;
  status: string;
  timestamp: string;
};

export default function HomePage() {
  const [sensor, setSensor] = useState<SensorData | null>(null);
  const [history, setHistory] = useState<HistoryData[]>([]);

  const loadSensorData = async () => {
    try {
      const sensorResponse = await fetch(
        "http://localhost:5000/sensor"
      );
      const sensorData = await sensorResponse.json();
      setSensor(sensorData);

      const historyResponse = await fetch(
        "http://localhost:5000/sensor/history"
      );
      const historyData = await historyResponse.json();
      setHistory(historyData);

      return sensorData;
    } catch (error) {
      console.error("Unable to load sensor data:", error);
      return null;
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startMonitoring = async () => {
      const data = await loadSensorData();

      if (data?.status === "SAFE") {
        return;
      }

      interval = setInterval(async () => {
        const latest = await loadSensorData();

        if (latest?.status === "SAFE") {
          clearInterval(interval);
        }
      }, 2000);
    };

    startMonitoring();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f7f2] p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#172018]">
              AgriTrust Sensor Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Real-time paddy storage health monitoring
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/farmer"
              className="rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white"
            >
              Farmer Portal
            </a>

            <a
              href="/manager"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
            >
              Bank Portal
            </a>
          </div>
        </div>

        {/* Current Status */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Current Paddy Health
              </p>

              <h2
                className={`mt-2 text-3xl font-bold ${
                  sensor?.status === "SAFE"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {sensor?.status || "--"}
              </h2>
            </div>

            {sensor?.status === "SAFE" && (
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                MONITORING STOPPED
              </span>
            )}
          </div>
        </div>

        {/* Sensor Cards */}
        <div className="mt-5 grid gap-5 md:grid-cols-4">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-400">
              Temperature
            </p>

            <p className="mt-3 text-3xl font-bold">
              {sensor?.temperature ?? "--"}°C
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-400">
              Humidity
            </p>

            <p className="mt-3 text-3xl font-bold">
              {sensor?.humidity ?? "--"}%
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-400">
              Moisture
            </p>

            <p className="mt-3 text-3xl font-bold">
              {sensor?.moisture ?? "--"}%
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-400">
              Quantity
            </p>

            <p className="mt-3 text-3xl font-bold">
              {sensor?.quantity ?? "--"} kg
            </p>
          </div>

        </div>

        {/* Temperature Readings */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Temperature Readings
          </h2>

          <div className="mt-5 space-y-3">
            {history.length === 0 ? (
              <p className="text-sm text-gray-500">
                No readings available.
              </p>
            ) : (
              history
                .slice(0, 10)
                .reverse()
                .map((reading) => (
                  <div
                    key={reading.id}
                    className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
                  >
                    <span className="text-sm text-gray-500">
                      {new Date(
                        reading.timestamp
                      ).toLocaleTimeString()}
                    </span>

                    <span className="font-bold">
                      {reading.temperature}°C
                    </span>

                    <span
                      className={`text-xs font-bold ${
                        reading.status === "SAFE"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {reading.status}
                    </span>
                  </div>
                ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
}