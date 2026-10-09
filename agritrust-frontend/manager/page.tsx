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

export default function BankPage() {
  const [sensor, setSensor] = useState<SensorData | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState<number | null>(null);

  const loadData = async () => {
    try {
      const [sensorRes, receiptRes, applicationsRes] =
        await Promise.all([
          fetch("http://localhost:5000/sensor"),
          fetch("http://localhost:5000/receipt/1"),
          fetch("http://localhost:5000/loan/applications"),
        ]);

      setSensor(await sensorRes.json());
      setReceipt(await receiptRes.json());
      setApplications(await applicationsRes.json());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();

    const interval = setInterval(async () => {
      const response = await fetch(
        "http://localhost:5000/sensor"
      );
      const data = await response.json();

      setSensor(data);

      if (data.status === "SAFE") {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
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
        `Loan approved. ₹${Number(data.amount).toLocaleString()} credited to ${data.farmer}'s demo wallet.`
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
    <main className="min-h-screen bg-[#f5f7f2] p-6">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-3xl font-bold text-[#172018]">
          AgriTrust Bank Portal
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Digital receipt verification and agricultural loan approval
        </p>

        {/* SENSOR DASHBOARD */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-[#172018]">
            Paddy Health Dashboard
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-4">

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-400">Temperature</p>
              <p className="mt-2 text-2xl font-bold">
                {sensor?.temperature ?? "--"}°C
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-400">Humidity</p>
              <p className="mt-2 text-2xl font-bold">
                {sensor?.humidity ?? "--"}%
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-400">Moisture</p>
              <p className="mt-2 text-2xl font-bold">
                {sensor?.moisture ?? "--"}%
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-400">
                Paddy Health
              </p>

              <p
                className={`mt-2 text-2xl font-bold ${
                  sensor?.status === "SAFE"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {sensor?.status ?? "--"}
              </p>
            </div>

          </div>
        </section>

        {/* FARMER RECEIPT */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Farmer Digital Receipt
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-3">

            <div>
              <p className="text-xs text-gray-400">
                Farmer
              </p>
              <p className="font-bold">
                {receipt?.farmer ?? "--"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Receipt ID
              </p>
              <p className="font-bold">
                #{receipt?.tokenId ?? "--"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Commodity
              </p>
              <p className="font-bold">
                {receipt?.commodity ?? "--"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Quantity
              </p>
              <p className="font-bold">
                {receipt?.quantity ?? "--"} kg
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Paddy Value
              </p>
              <p className="font-bold">
                ₹
                {Number(
                  receipt?.value ?? 0
                ).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Receipt Status
              </p>
              <p
                className={`font-bold ${
                  receipt?.status === "SAFE"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {receipt?.status ?? "--"}
              </p>
            </div>

          </div>
        </section>

        {/* APPLICATIONS */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Loan Applications
          </h2>

          <div className="mt-5 space-y-4">
            {applications.length === 0 ? (
              <p className="text-sm text-gray-500">
                No loan applications yet.
              </p>
            ) : (
              applications.map((application) => (
                <div
                  key={application.id}
                  className="rounded-2xl border border-gray-200 p-5"
                >
                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                    <div>
                      <p className="text-xs text-gray-400">
                        Application #{application.id}
                      </p>

                      <h3 className="mt-1 text-lg font-bold">
                        {application.farmer}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Requested Amount:
                        <span className="ml-2 font-bold text-green-700">
                          ₹
                          {Number(
                            application.amount
                          ).toLocaleString()}
                        </span>
                      </p>

                      <p className="mt-1 text-sm">
                        Status:
                        <span className="ml-2 font-bold">
                          {application.status}
                        </span>
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        Farmer Message:
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {application.status === "SUBMITTED"
                          ? "Please review my warehouse receipt and approve my requested loan."
                          : application.status ===
                            "APPROVED"
                          ? "Loan approved."
                          : "Loan rejected."}
                      </p>
                    </div>

                    {application.status === "SUBMITTED" && (
                      <div className="flex gap-3">

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