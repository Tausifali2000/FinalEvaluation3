import React, { useEffect, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useAnalyticsStore } from "../store/analytics.store";

const CustomLineChart = () => {
  const { totalClicks, fetchAnalytics } = useAnalyticsStore();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Define permanent X-axis ticks from Jan to Jul
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  // Transform data for the chart
  const chartData = useMemo(() => {
    if (!totalClicks || totalClicks.length === 0) {
      return months.map(month => ({ name: month, value: 0 }));
    }

    const formattedData = totalClicks.reduce((acc, entry) => {
      const dateParts = entry.date.split(" ");
      if (dateParts.length >= 2) {
        const month = dateParts[1].replace(",", ""); // Extract and clean month name
        acc[month] = (acc[month] || 0) + entry.clicks;
      }
      return acc;
    }, {});

    // Ensure all months are present with data or default value if missing
    return months.map(month => ({ name: month, value: formattedData[month] || 0 }));
  }, [totalClicks]);

  return (
    <ResponsiveContainer width="90%" height={300}>
      <AreaChart data={chartData}>
        {/* X-Axis with fixed ticks */}
        <XAxis 
          dataKey="name" 
          tick={{ fill: "#9A9A9A" }} 
          tickLine={false} 
          axisLine={false} 
          interval={0} // Ensures all months are shown
        />
        
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
