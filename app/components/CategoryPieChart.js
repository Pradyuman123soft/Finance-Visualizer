"use client";  // Ensure this is at the top for Next.js (App Router)
import { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";

export default function CategoryPieChart({ transactions }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid SSR rendering issues

  // Define colors for each category
  const categoryColors = {
    Food: "#32CD32", // Green
    Shopping: "#444444", // Black
    Traveling: "#FFD700", // Yellow
  };

  // Process transaction data for the pie chart
  const data = transactions.reduce((acc, t) => {
    const found = acc.find((item) => item.category === t.category);
    if (found) {
      found.amount += t.amount;
    } else {
      acc.push({ category: t.category, amount: t.amount });
    }
    return acc;
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">Category Overview</h2>
      
      <div className="w-full h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="amount"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius="60%" // Adjusts based on container size
              label={({ index }) => data[index].category}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={categoryColors[entry.category] || "#8884d8"} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name, props) => [`$${value}`, props.payload.category]} />
            <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
