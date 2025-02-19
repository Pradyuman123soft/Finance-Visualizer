"use client";
import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import React from 'react';
import Link from "next/link";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.ok ? res.json() : Promise.reject(`Error ${res.status}`))
      .then(setTransactions)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <div className="container mx-auto max-w-5xl px-4 py-6">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-700">
            &lt;FinanceVisualizer/&gt;
          </h1>
          <p className="text-lg text-gray-600">Your Own Finance-Visualizer</p>
        </div>

        {/* Transaction Form */}
        <div className="w-full max-w-3xl mx-auto">
          <TransactionForm onAdd={(newTransaction) => setTransactions([...transactions, newTransaction])} />
        </div>

        {/* Transactions List */}
        <div className="w-full mt-6">
          {transactions.length === 0 ? (
            <p className="text-center text-gray-700">Please enter a transaction first...</p>
          ) : (
            <TransactionList transactions={transactions} />
          )}
        </div>

        {/* Navigation to Dashboard */}
        <div className="text-center mt-10">
          <h4 className="text-lg font-semibold text-gray-700">For Expenses Chart, click below:</h4>
          <Link href="/dashboard">
            <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4">
              Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
