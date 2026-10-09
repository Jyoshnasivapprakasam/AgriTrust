"use client";

import { useEffect, useState } from "react";

type SensorData = {
  temperature: number;
  humidity: number;
  moisture: number;
  quantity: number;
  status: string;
};

type Receipt = {
  tokenId: string;
  owner: string;
  farmer: string;
  commodity: string;
  quantity: string;
  value: string;
  active: boolean;
  status: string;
};

type Application = {
  id: number;
  farmer: string;
  amount: number;
  status: string;
  created_at: string;
};

export default function BankPortal() {
  const [sensor, setSensor] = useState<SensorData | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState<number | null>(null);
  const [farmers, setFarmers] = useState<any[]>([]);
  const [selectedFarmer, setSelectedFarmer] = useState<any | null>(null);
  

  const loadData = async () => {
    try {
      const [
        sensorRes,
        receiptRes,
        applicationsRes,
        farmersRes,
      ] = await Promise.all([
        fetch("http://localhost:5000/sensor"),
        fetch("http://localhost:5000/receipt/7"),
        fetch("http://localhost:5000/loan/applications"),
        fetch("http://localhost:5000/farmers"),
      ]);

      setSensor(await sensorRes.json());
      setReceipt(await receiptRes.json());
      setApplications(await applicationsRes.json());
      setFarmers(await farmersRes.json());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const startMonitoring = async () => {
      const response = await fetch("http://localhost:5000/sensor");
      const data = await response.json();

      setSensor(data);

      if (data.status !== "SAFE") {
        interval = setInterval(async () => {
          const response = await fetch("http://localhost:5000/sensor");
          const latest = await response.json();

          setSensor(latest);

          if (latest.status === "SAFE") {
            clearInterval(interval);
          }
        }, 2000);
      }
    };

    loadData();
    startMonitoring();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const approveLoan = async (id: number) => {
    setProcessing(id);
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:5000/loan/approve/${id}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Approval failed.");
        return;
      }

      setMessage(
        `Loan approved. ₹${Number(
          data.amount
        ).toLocaleString()} credited to ${data.farmer}'s demo wallet.`
      );

      await loadData();
    } catch (error) {
      console.error(error);
      setMessage("Unable to approve loan.");
    } finally {
      setProcessing(null);
    }
  };

  const rejectLoan = async (id: number) => {
    setProcessing(id);
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:5000/loan/reject/${id}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Rejection failed.");
        return;
      }

      setMessage(
        `Loan application rejected for ${data.farmer}.`
      );

      await loadData();
    } catch (error) {
      console.error(error);
      setMessage("Unable to reject loan.");
    } finally {
      setProcessing(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7f2] px-6 py-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#176b3a]">
              AgriTrust
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#172018]">
              Bank Portal
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Verify farmer receipts and process agricultural financing
            </p>
          </div>

          <div
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              sensor?.status === "SAFE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            Paddy: {sensor?.status || "--"}
          </div>
        </div>

        {/* SENSOR SUMMARY */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-[#172018]">
            Storage Health
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-4">

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase text-gray-400">
                Temperature
              </p>
              <p className="mt-2 text-2xl font-bold">
                {sensor?.temperature ?? "--"}°C
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase text-gray-400">
                Humidity
              </p>
              <p className="mt-2 text-2xl font-bold">
                {sensor?.humidity ?? "--"}%
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase text-gray-400">
                Moisture
              </p>
              <p className="mt-2 text-2xl font-bold">
                {sensor?.moisture ?? "--"}%
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase text-gray-400">
                Quantity
              </p>
              <p className="mt-2 text-2xl font-bold">
                {sensor?.quantity ?? "--"} kg
              </p>
            </div>

          </div>
        </section>

        {/* FARMER DETAILS + RECEIPT */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold">
            Farmer Digital Receipt
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Verify the stored paddy before approving financing.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">

            <div>
              <p className="text-xs uppercase text-gray-400">
                Farmer Name
              </p>
              <p className="mt-1 font-bold">
                {receipt?.farmer || "--"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">
                Receipt ID
              </p>
              <p className="mt-1 font-bold">
                #{receipt?.tokenId || "--"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">
                Commodity
              </p>
              <p className="mt-1 font-bold">
                {receipt?.commodity || "--"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">
                Quantity
              </p>
              <p className="mt-1 font-bold">
                {receipt?.quantity || "--"} kg
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">
                Paddy Value
              </p>
              <p className="mt-1 font-bold text-[#176b3a]">
                ₹{Number(receipt?.value || 0).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">
                Receipt Status
              </p>
              <p
                className={`mt-1 font-bold ${
                  receipt?.status === "SAFE"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {receipt?.status || "--"}
              </p>
            </div>

          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-4">
            <p className="text-xs font-bold uppercase text-gray-400">
              Sensor Verification
            </p>

            <p className="mt-2 text-sm text-gray-700">
              Temperature: {sensor?.temperature ?? "--"}°C
              {"  •  "}
              Humidity: {sensor?.humidity ?? "--"}%
              {"  •  "}
              Moisture: {sensor?.moisture ?? "--"}%
            </p>
          </div>
        </section>


        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Farmer Database
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Registered farmers in AgriTrust
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {farmers.map((farmer) => (
            <button
              key={farmer.id}
              onClick={async () => {
                setSelectedFarmer(farmer);

                const response = await fetch(
                  `http://localhost:5000/receipt/${farmer.receipt_id}`
                );

                const data = await response.json();
                setReceipt(data);
              }}
              className="w-full rounded-2xl border border-gray-200 p-5 text-left hover:border-green-500"
            >
                <p className="text-xs font-bold uppercase text-gray-400">
                  Farmer ID
                </p>

                <p className="text-lg font-bold">
                  #{farmer.id}
                </p>

                <p className="mt-3 text-xs text-gray-400">
                  Farmer Name
                </p>

                <p className="font-bold">
                  {farmer.name}
                </p>

                <p className="mt-3 text-xs text-gray-400">
                  Receipt ID
                </p>

                <p className="font-bold">
                  #{farmer.receipt_id}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* LOAN APPLICATION */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

          <div>
            <h2 className="text-xl font-bold">
              Loan Applications
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Review the farmer's application and decide whether to approve financing.
            </p>
          </div>

          <div className="mt-6 space-y-4">

            {applications.length === 0 ? (
              <div className="rounded-xl bg-gray-50 p-5 text-sm text-gray-500">
                No loan applications yet.
              </div>
            ) : (
              applications.map((application) => (
                <div
                  key={application.id}
                  className="rounded-2xl border border-gray-200 p-5"
                >

                  <div className="flex flex-col justify-between gap-5 md:flex-row">

                    <div className="space-y-2">

                      <p className="text-xs font-bold uppercase text-gray-400">
                        Application #{application.id}
                      </p>

                      <h3 className="text-lg font-bold">
                        {application.farmer}
                      </h3>

                      <p className="text-sm text-gray-600">
                        Government-assigned loan amount:
                        <span className="ml-2 font-bold text-[#176b3a]">
                          ₹{Number(
                            application.amount
                          ).toLocaleString()}
                        </span>
                      </p>

                      <p className="text-sm">
                        Application Status:
                        <span className="ml-2 font-bold">
                          {application.status}
                        </span>
                      </p>

                      <div className="mt-3 rounded-xl bg-gray-50 p-4">
                        <p className="text-xs font-bold uppercase text-gray-400">
                          Farmer Application Message
                        </p>

                        <p className="mt-2 text-sm text-gray-700">
                          I request agricultural financing against my verified
                          paddy warehouse receipt.
                        </p>
                      </div>

                    </div>

                    {application.status === "SUBMITTED" && (
                      <div className="flex items-start gap-3">

                        <button
                          onClick={() =>
                            approveLoan(application.id)
                          }
                          disabled={
                            processing === application.id ||
                            sensor?.status !== "SAFE"
                          }
                          className="rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                          {processing === application.id
                            ? "Processing..."
                            : "Approve"}
                        </button>

                        <button
                          onClick={() =>
                            rejectLoan(application.id)
                          }
                          disabled={
                            processing === application.id
                          }
                          className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                          Reject
                        </button>

                      </div>
                    )}

                    {application.status === "APPROVED" && (
                      <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-700">
                        APPROVED
                      </span>
                    )}

                    {application.status === "REJECTED" && (
                      <span className="rounded-full bg-red-100 px-4 py-2 text-xs font-bold text-red-700">
                        REJECTED
                      </span>
                    )}

                  </div>
                </div>
              ))
            )}

          </div>

          {message && (
            <div className="mt-5 rounded-xl bg-blue-50 p-4 text-sm font-semibold text-blue-700">
              {message}
            </div>
          )}

        </section>

      </div>
    </main>
  );
}