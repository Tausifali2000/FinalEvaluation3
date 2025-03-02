import React, { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useProfileStore } from "../store/profile.store";

const colors = ["#98F5E1", "#A8E6CF", "#004D40", "#00E676", "#A5D6A7", "#008C72"];

const BarChartComponent2 = () => {
  const { links, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, []);

  // Ensure links exist before mapping
  const chartData = (links || []).map((link, index) => ({
    device: `Link ${index + 1}`, // X-axis label
    value: Number(link.clicks) || 0 // Ensuring it's a number
  }));

  return (
    <ResponsiveContainer width="100%" height={390}>
      <BarChart 
        data={chartData.length > 0 ? chartData : [{ device: "No Data", value: 0 }]} // Prevent empty data issues
        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
      >
        <XAxis 
          dataKey="device"
          tick={{ fontSize: 14, fill: "#676767" }} 
          axisLine={false} 
          tickLine={false} 
          dy={10} 
        />
        <YAxis 
          tick={{ fontSize: 14, fill: "#676767" }} 
          tickFormatter={(value) => `${value / 1000}k`} 
          ticks={[0, 1000, 2000, 3000]} 
          domain={[0, 3000]} 
          axisLine={false} 
          tickLine={false} 
        />
        <Tooltip />
        <Bar dataKey="value" radius={[9, 9, 9, 9]} barSize={40}> 
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent2;
