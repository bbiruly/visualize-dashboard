"use client";

import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useChartSize } from "@/hooks/useChartSize";

const chartData = [
  { month: "10-Jan", desktop: 186 },
  { month: "10-Feb", desktop: 305 },
  { month: "10-Mar", desktop: 237 },
  { month: "10-Apr", desktop: 73 },
  { month: "10-May", desktop: 209 },
  { month: "10-Jun", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

const DummyChart = () => {
  const chartSize = useChartSize()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Trend</CardTitle>
        <CardDescription>Time trend for Feature:</CardDescription>
      </CardHeader>
      <CardContent>
        <LineChart
          width={chartSize.width}
          height={chartSize.height}
          data={chartData}
          margin={{ top: 10, right: 0, left: 10, bottom: 20 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="month"
            label={{
              value: "Date",
              position: "insideBottomRight",
              offset: -5,
            }}
          />
          <YAxis
            label={{ value: "Value", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line
            type="linear"
            dataKey="desktop"
            stroke={chartConfig.desktop.color}
            dot
          />
        </LineChart>
      </CardContent>
    </Card>
  );
};

export default DummyChart;
