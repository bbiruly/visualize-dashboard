"use client";

import { FC, useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import moment from "moment";
import DummyChart from "./DummyChart";
import { useChartSize } from "@/hooks/useChartSize";

//COLOR THEME FOR GRAPH
const chartConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "#007bff", 
  },
  mobile: {
    label: "Mobile",
    color: "#28a745",
  },
};

interface SummaryProps {
  data: Dataset[];
}


// Define a type for Dataset
type Dataset = {
  Day: string;
  [key: string]: number | string | undefined; // Adjust type based on your actual dataset
};



//PROCESS THE DATA FOR BAR CHART
const processChartData = (data: Dataset[]) => {
  const features: (keyof Dataset)[] = ["F", "E", "D", "C", "B", "A"];
  return features.map((feature) => ({
    feature,
    value: data.reduce((acc, entry) => {
      const value = entry[feature];
      // Ensure value is a number, fallback to 0 if not
      return acc + (typeof value === 'number' ? value : 0);
    }, 0),
  }));
};

//PROCESS THE DATA WHEN CLICK ON THE BAR OF BAR GRAPH
const prepareLineChartData = (data: Dataset[], feature: string) => {
  return data
    .filter((entry) => entry[feature] !== undefined)
    .map((entry) => ({
      date: moment(entry.Day).format("DD-MM"), // Fixed timestamp format
      value: entry[feature] || 0,
    }));
};

const BarChartComponent: FC<SummaryProps> = ({ data }) => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [lineChartData, setLineChartData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  //get filter prefrences

  //hook for resize the chart accordiing to mobile size
  const chartSize = useChartSize()

  //IT RENDER WHEN DATA UPDATE
  useEffect(() => {
    if (data ) {
      const chartData = processChartData(data);
      setChartData(chartData);
    }
  }, [data]);

//HANDLE BAR CLICK
  const handleBarClick = (value: any) => {
    if (value) {
      setSelectedFeature(value.feature);
      const trendData = prepareLineChartData(data, value.feature); 
      setLineChartData(trendData);
    }
  };


  return (
    <>
    <div className={`flex flex-col md:flex md:flex-row justify-around items-center gap-y-5 md:gap-x-10 mt-2 p-3 bg-gray-100 rounded-md dark:bg-gray-400`}>
      <Card>
        <CardHeader>
          <CardTitle>Total </CardTitle>
          <CardDescription>
            Showing total time spent for features A, B, C, D, E, and F
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            layout="vertical"
            width={chartSize.width}
            height={chartSize.height}
            data={chartData}
            margin={{ left: 0, top: 20, bottom: 20 }}
          >
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{ value: "Time", position: "bottom" }}
            />
            <YAxis
              type="category"
              dataKey="feature"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              label={{ value: "Features", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
              content={({ payload, label }) => (
                <div
                  style={{
                    background: "#fff",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  {payload && payload.length > 0 && (
                    <>
                      <p>{label}</p>
                      <p>{`Value: ${payload[0].value}`}</p>
                    </>
                  )}
                </div>
              )}
            />
            <Bar
              dataKey="value"
              fill={chartConfig.desktop.color}
              radius={5}
              onClick={handleBarClick}
            />
          </BarChart>
        </CardContent>
      </Card>
      {selectedFeature ? (        
      <Card>
        <CardHeader>
          <CardTitle>Time trend</CardTitle>
          <CardDescription>
          Time Trend for Feature: {selectedFeature}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* //linechart  */}
          
              <LineChart
              width={chartSize.width}
              height={chartSize.height}
                data={lineChartData}
                margin={{ top: 10, right: 0, left: 20, bottom: 20 }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis
                  dataKey="date"
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
                  dataKey="value"
                  stroke={chartConfig.desktop.color}
                  dot={true}
                />
              </LineChart>
        </CardContent>
      </Card>
      ):( <DummyChart/>)
      }
    </div>

    </>
  );
};

export default BarChartComponent;
