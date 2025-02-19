"use client";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

export default function ExpensesChart({ transactions }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Extracting day from the date format
  const data = transactions.map((t) => ({
    date: t.date.split("-")[2].split("T")[0], // Extracting day from YYYY-MM-DD format
    amount: t.amount,
  }));

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">Expenses Overview</h2>
      <div className="w-full h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" /> {/* Adds grid lines */}
            
            {/* X-Axis: Dynamic label formatting */}
            <XAxis 
              dataKey="date" 
              label={{ value: "Date (DD)", position: "insideBottom", offset: -5 }} 
              tick={{ fontSize: 12 }} 
            />
            
            {/* Y-Axis: Dynamic label formatting */}
            <YAxis 
              label={{ value: "Amount ($)", angle: -90, position: "insideLeft", offset: -5 }} 
              tick={{ fontSize: 12 }} 
            />

            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#4F46E5" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
