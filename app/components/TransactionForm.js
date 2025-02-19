"use client";
import { useState } from "react";

const TransactionForm = ({ onAdd }) => {
  const [data, setData] = useState({
    amount: "",
    date: "",
    description: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const newTransaction = await res.json();
      onAdd(newTransaction);
      // Reset form
      setData({ amount: "", date: "", description: "", category: "" });
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4"
      >
        <input
          className="w-full p-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          value={data.amount}
          type="number"
          placeholder="Enter Amount"
          required
          onChange={(e) => setData({ ...data, amount: e.target.value })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="w-full p-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            value={data.date}
            type="date"
            required
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />

          <input
            className="w-full p-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            value={data.description}
            type="text"
            placeholder="Enter Description"
            required
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>

        <select
          className="w-full p-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          value={data.category}
          onChange={(e) => setData({ ...data, category: e.target.value })}
          required
        >
          <option value="" disabled defaultValue>
            Select a Category
          </option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Transport">Transport</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-all duration-300"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
