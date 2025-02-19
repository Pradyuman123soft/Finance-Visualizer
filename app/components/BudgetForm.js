"use client";
import { useState } from "react";

export default function BudgetForm({ refreshBudgets }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const budgetData = { category, amount: Number(amount), month };
    console.log("Sending Budget Data:", budgetData); // Debug request payload

    try {
      const res = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(budgetData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        return;
      }

      setCategory("");
      setAmount("");
      setMonth("");
      refreshBudgets(); // Refresh budget list
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow-md rounded-md w-full max-w-md mx-auto"
    >
      <h3 className="text-lg font-semibold mb-3 text-center">Set Monthly Budget</h3>

      <div className="space-y-3">
        <select
          className="border p-2 w-full rounded focus:ring focus:ring-green-300"
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option disabled defaultValue>
            Select a Category
          </option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Transport">Transport</option>
        </select>

        <div className="sm:flex sm:space-x-2">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="border p-2 w-full rounded focus:ring focus:ring-green-300"
          />

          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
            className="border p-2 w-full rounded focus:ring focus:ring-green-300"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full transition"
        >
          Save Budget
        </button>
      </div>
    </form>
  );
}
