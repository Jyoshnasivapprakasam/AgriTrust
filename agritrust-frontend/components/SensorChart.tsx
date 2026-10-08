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
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 15,
            right: 20,
            left: -12,
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
            minTickGap={18}
          />

          <YAxis
            tick={{
              fontSize: 10,
              fill: "#8a928b",
            }}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            width={38}
          />

          <Tooltip
            cursor={{
              stroke: "#cfd8cf",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              borderRadius: "14px",
              border: "1px solid #dfe5dc",
              backgroundColor: "#ffffff",
              padding: "11px 13px",
              boxShadow: "0 10px 30px rgba(23,32,24,0.08)",
              fontSize: "12px",
            }}
            labelStyle={{
              color: "#172018",
              fontWeight: 700,
              marginBottom: "7px",
            }}
            itemStyle={{
              padding: "2px 0",
            }}
          />

          <Legend
            verticalAlign="bottom"
            height={38}
            iconType="circle"
            iconSize={7}
            wrapperStyle={{
              fontSize: "11px",
              color: "#6b756c",
              paddingTop: "13px",
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
            isAnimationActive
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
            isAnimationActive
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
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}