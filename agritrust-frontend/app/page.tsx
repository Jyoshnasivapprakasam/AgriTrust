"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Droplets,
  Package,
  RefreshCw,
  ShieldCheck,
  Thermometer,
  TrendingDown,
  Waves,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import SensorChart, {
  SensorHistory,
} from "@/components/SensorChart";

interface SensorData {
  temperature: number;
  humidity: number;
  moisture: number;
  quantity: number;
  status: string;
}

export default function Home() {
  const [sensor, setSensor] = useState<SensorData | null>(null);
  const [history, setHistory] = useState<SensorHistory[]>([]);
  const [error, setError] = useState("");

  const fetchSensor = async () => {
    try {
      const response = await fetch("http://localhost:5000/sensor", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Sensor request failed");
      }

      const data: SensorData = await response.json();

      setSensor(data);
      setError("");

      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setHistory((previous) => {
        const updated = [
          ...previous,
          {
            time,
            moisture: Number(data.moisture),
            temperature: Number(data.temperature),
            humidity: Number(data.humidity),
          },
        ];

        return updated.slice(-20);
      });
    } catch {
      setError("Unable to connect to the storage sensor service.");
    }
  };

    useEffect(() => {
    fetchSensor();

    const interval = setInterval(fetchSensor, 2000);

    return () => clearInterval(interval);
  }, []);

  const safe =
    sensor &&
    (Number(sensor.moisture) <= 14 ||
      sensor.status?.toLowerCase() === "safe");

  return (
    <main className="min-h-screen bg-[#f4f6f1] lg:pl-64">
      <Navbar />

      {/* Mobile Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#dfe5dc] bg-white px-5 py-4 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#176b3a]">
            <Activity size={18} className="text-white" />
          </div>

          <div>
            <p className="text-sm font-bold text-[#172018]">
              AgriTrust
            </p>

            <p className="text-[10px] uppercase tracking-wider text-gray-400">
              Storage Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

          <span className="text-[10px] font-bold uppercase text-green-700">
            Live
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1540px] px-5 py-6 md:px-8 lg:px-10 lg:py-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl border border-[#dfe5dc] bg-white px-6 py-7 shadow-sm md:px-8 md:py-8">
          <div className="absolute right-0 top-0 h-40 w-40 translate-x-12 -translate-y-12 rounded-full bg-[#e9f3e9]" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#176b3a]">
                  Live Storage Monitoring
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-[#172018] md:text-4xl">
                Paddy Storage Overview
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Monitor grain quality, storage conditions and asset health
                from one intelligent storage dashboard.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-[#e0e6dd] bg-[#f8faf7] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                <RefreshCw size={15} className="text-[#176b3a]" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Sensor sync
                </p>

                <p className="mt-0.5 text-xs font-semibold text-[#172018]">
                  Updating every 2 seconds
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* Moisture */}
          <div className="rounded-2xl border border-[#dfe5dc] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                  Paddy Moisture
                </p>

                <p className="mt-3 text-3xl font-bold tracking-tight text-[#172018]">
                  {sensor
                    ? `${Number(sensor.moisture).toFixed(1)}%`
                    : "--"}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <Droplets size={20} className="text-blue-600" />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50">
                <TrendingDown size={12} className="text-green-600" />
              </div>

              <span className="text-xs font-semibold text-green-600">
                Target ≤ 14%
              </span>
            </div>
          </div>

          {/* Temperature */}
          <div className="rounded-2xl border border-[#dfe5dc] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                  Temperature
                </p>

                <p className="mt-3 text-3xl font-bold tracking-tight text-[#172018]">
                  {sensor
                    ? `${Number(sensor.temperature).toFixed(1)}°C`
                    : "--"}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                <Thermometer size={20} className="text-orange-600" />
              </div>
            </div>

            <p className="mt-5 text-xs text-gray-400">
              Ambient storage temperature
            </p>
          </div>

          {/* Humidity */}
          <div className="rounded-2xl border border-[#dfe5dc] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                  Humidity
                </p>

                <p className="mt-3 text-3xl font-bold tracking-tight text-[#172018]">
                  {sensor
                    ? `${Number(sensor.humidity).toFixed(1)}%`
                    : "--"}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                <Waves size={20} className="text-purple-600" />
              </div>
            </div>

            <p className="mt-5 text-xs text-gray-400">
              Ambient relative humidity
            </p>
          </div>

          {/* Quantity */}
          <div className="rounded-2xl border border-[#dfe5dc] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                  Stored Quantity
                </p>

                <p className="mt-3 text-3xl font-bold tracking-tight text-[#172018]">
                  {sensor
                    ? Number(sensor.quantity).toLocaleString()
                    : "--"}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <Package size={20} className="text-[#176b3a]" />
              </div>
            </div>

            <p className="mt-5 text-xs text-gray-400">
              Paddy inventory
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_350px]">
          {/* Sensor Chart */}
          <div className="rounded-3xl border border-[#dfe5dc] bg-white p-6 shadow-sm md:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#edf5ed]">
                    <Activity size={16} className="text-[#176b3a]" />
                  </div>

                  <h2 className="font-bold text-[#172018]">
                    Sensor Telemetry
                  </h2>
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Live environmental readings from the warehouse
                </p>
              </div>

              <div className="flex items-center gap-2 self-start rounded-full bg-green-50 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                <span className="text-[10px] font-bold tracking-wider text-green-700">
                  LIVE
                </span>
              </div>
            </div>

            <div className="mt-7">
              {history.length > 0 ? (
                <SensorChart data={history} />
              ) : (
                <div className="flex h-80 flex-col items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3f6f1]">
                    <Activity size={20} className="text-gray-400" />
                  </div>

                  <p className="mt-4 text-sm font-medium text-gray-500">
                    Waiting for sensor data...
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Connecting to storage sensors
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Storage Health */}
          <div className="rounded-3xl border border-[#dfe5dc] bg-white p-6 shadow-sm md:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                  Warehouse Status
                </p>

                <h2 className="mt-1 font-bold text-[#172018]">
                  Storage Health
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                <ShieldCheck size={19} className="text-[#176b3a]" />
              </div>
            </div>

            <div
              className={`mt-6 rounded-2xl border p-5 ${
                safe
                  ? "border-green-100 bg-green-50/80"
                  : "border-yellow-100 bg-yellow-50/80"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    safe ? "bg-green-500" : "bg-yellow-500"
                  }`}
                />

                <span
                  className={`text-sm font-bold ${
                    safe ? "text-green-700" : "text-yellow-700"
                  }`}
                >
                  {safe
                    ? "Safe & e-NWR Minted"
                    : "Drying in Progress"}
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-gray-500">
                {safe
                  ? "Moisture is within the safe storage threshold."
                  : "Moisture is above the safe threshold. Continue monitoring the drying process."}
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between border-b border-gray-100 py-3.5">
                <span className="text-xs text-gray-500">
                  Moisture threshold
                </span>

                <span className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-bold text-[#172018]">
                  14%
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 py-3.5">
                <span className="text-xs text-gray-500">
                  Sensor connection
                </span>

                <span className="flex items-center gap-2 text-xs font-bold text-green-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between py-3.5">
                <span className="text-xs text-gray-500">
                  Backend
                </span>

                <span className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-bold text-gray-700">
                  Port 5000
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow */}
        <div className="mt-5 rounded-3xl border border-[#dfe5dc] bg-white p-6 shadow-sm md:p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#176b3a]">
                AgriTrust Workflow
              </p>

              <h2 className="mt-1 font-bold text-[#172018]">
                From Physical Paddy to Digital Financing
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                How stored agricultural assets move through the platform
              </p>
            </div>

            <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-[#f4f7f2] sm:flex">
              <ArrowUpRight size={18} className="text-[#176b3a]" />
            </div>
          </div>

          <div className="mt-7 grid gap-3 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "Paddy Intake",
                text: "Warehouse manager records incoming grain.",
              },
              {
                number: "02",
                title: "Smart Monitoring",
                text: "Sensors continuously track storage conditions.",
              },
              {
                number: "03",
                title: "e-NWR Receipt",
                text: "Verified paddy receives a digital receipt.",
              },
              {
                number: "04",
                title: "Pledge Financing",
                text: "Farmers access financing against stored assets.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-gray-100 bg-[#fafbf9] p-5 transition hover:border-[#cbdcca] hover:bg-[#f7faf5]"
              >
                <span className="flex h-7 w-9 items-center justify-center rounded-lg bg-[#eaf3e9] text-[10px] font-bold text-[#176b3a]">
                  {step.number}
                </span>

                <h3 className="mt-4 font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center justify-between gap-2 px-1 py-6 text-[10px] text-gray-400 sm:flex-row">
          <span>
            AgriTrust • Smart Agricultural Asset Monitoring
          </span>

          <span>
            Live sensor infrastructure
          </span>
        </div>
      </div>
    </main>
  );
}