import React, { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useAnalyticsStore } from "../store/analytics.store";

const colors = ["#004D40", "#00E676", "#A8E6CF", "#008C72"];

const PieChartComponent = () => {
  const { sites, fetchAnalytics } = useAnalyticsStore();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Convert `sites` object to an array format for Recharts
  const chartData = Object.keys(sites).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
    value: sites[key] || 0
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={chartData} // Use fetched analytics data
          cx="30%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={5}
          cornerRadius={4}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          iconSize={0} // Hide default icon
          formatter={(value, entry) => (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "160px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  background: entry.color,
                  borderRadius: "50%",
                  display: "inline-block"
                }}
              ></span>
              <span style={{ fontSize: "15px", color: "#333", fontWeight: "400", flex: 1 }}>{value}</span>
              <span style={{ fontSize: "15px", color: "#333", fontWeight: "400" }}>{entry.payload.value}</span>
            </div>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
