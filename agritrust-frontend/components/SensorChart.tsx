"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface SensorHistory {
  time: string;
  moisture: number;
  temperature: number;
  humidity: number;
}

interface SensorChartProps {
  data: SensorHistory[];
}

export default function SensorChart({
  data,
}: SensorChartProps) {
  return (
    <div className="h-[340px] w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart
          data={data}
          margin={{
            top: 15,
            right: 15,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid
            stroke="#edf0eb"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="time"
            tick={{
              fontSize: 10,
              fill: "#8a928b",
            }}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />

          <YAxis
            tick={{
              fontSize: 10,
              fill: "#8a928b",
            }}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />

          <Tooltip
            cursor={{
              stroke: "#dfe5dc",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              borderRadius: "14px",
              border: "1px solid #dfe5dc",
              backgroundColor: "#ffffff",
              padding: "10px 12px",
              boxShadow: "0 10px 30px rgba(23,32,24,0.08)",
              fontSize: "12px",
            }}
            labelStyle={{
              color: "#172018",
              fontWeight: 700,
              marginBottom: "5px",
            }}
          />

          <Legend
            verticalAlign="bottom"
            height={35}
            iconType="circle"
            iconSize={7}
            wrapperStyle={{
              fontSize: "11px",
              color: "#6b756c",
              paddingTop: "12px",
            }}
          />

          <Line
            type="monotone"
            dataKey="moisture"
            name="Moisture"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 2,
              stroke: "#ffffff",
            }}
            animationDuration={400}
          />

          <Line
            type="monotone"
            dataKey="temperature"
            name="Temperature"
            stroke="#ea580c"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 2,
              stroke: "#ffffff",
            }}
            animationDuration={400}
          />

          <Line
            type="monotone"
            dataKey="humidity"
            name="Humidity"
            stroke="#9333ea"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 2,
              stroke: "#ffffff",
            }}
            animationDuration={400}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}