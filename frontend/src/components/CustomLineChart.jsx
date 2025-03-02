import React, { useEffect, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useAnalyticsStore } from "../store/analytics.store";

const CustomLineChart = () => {
  const { dates, fetchAnalytics } = useAnalyticsStore();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Transform data for the chart
  const chartData = useMemo(() => {
    if (!dates || dates.length === 0) return [];

    return dates.map((entry) => ({
      name: entry.date.split(",")[0], // Extract "2 Mar" from "2 Mar, 2025"
      value: entry.clicks,
    }));
  }, [dates]);

  return (
   
      <ResponsiveContainer width="100%" height={300} >
        <AreaChart data={chartData} >
          {/* X-Axis */}
          <XAxis dataKey="name" tick={{ fill: "#9A9A9A" }} tickLine={false} axisLine={false} />
          
          {/* Y-Axis with Strict Ticks */}
          <YAxis
            tick={{ fill: "#9A9A9A" }}
            tickFormatter={(value) => `${value / 1000}k`} // Format 1000 as "1k"
            tickLine={false}
            axisLine={false}
            domain={[0, 3000]} // Set min and max values
            ticks={[0, 1000, 2000, 3000]} // Strictly show only these ticks
          />

          {/* Tooltip */}
          <Tooltip contentStyle={{ borderRadius: "10px", border: "none", backgroundColor: "#fff" }} />

          {/* Gradient Fill */}
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8F5E9" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#fff" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Area Chart with Gradient */}
          <Area type="monotone" dataKey="value" stroke="#000" fill="url(#colorGradient)" strokeWidth={1.5} />
        </AreaChart>
      </ResponsiveContainer>
  
  );
};

export default CustomLineChart;
