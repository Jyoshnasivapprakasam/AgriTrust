"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type SensorData = {
  time: string;
  moisture: number;
  temperature: number;
  humidity: number;
};

type SensorChartProps = {
  data: SensorData[];
};

export default function SensorChart({ data }: SensorChartProps) {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="moisture"
            stroke="#16a34a"
            strokeWidth={3}
            dot={false}
            name="Moisture (%)"
          />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#ea580c"
            strokeWidth={3}
            dot={false}
            name="Temperature (°C)"
          />

          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}
            name="Humidity (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}