import React, { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useAnalyticsStore } from "../store/analytics.store";

const colors = ["#98F5E1", "#A8E6CF", "#004D40", "#00E676", "#A5D6A7", "#008C72"];

const BarChartComponent = () => {
  const { devices, fetchAnalytics } = useAnalyticsStore();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Convert `devices` object to an array format for Recharts
  const chartData = Object.keys(devices).map((key) => ({
    device: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
    value: devices[key] || 0
  }));

  return (
    <ResponsiveContainer width="100%" height={244}>
      <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
        <XAxis 
          dataKey="device" 
          tick={{ fontSize: 14, fill: "#676767" }} 
          axisLine={false} 
          tickLine={false} 
          dy={10} // Adds 10px space between bars and X-axis labels
        />
        <YAxis 
          tick={{ fontSize: 14, fill: "#676767" }} 
          tickFormatter={(value) => `${value / 1000}k`} 
          ticks={[0, 1000, 2000, 3000]} 
          axisLine={false} 
          tickLine={false} 
        />
        <Tooltip />
        <Bar dataKey="value" radius={[9, 9, 9, 9]} barSize={34}> 
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
