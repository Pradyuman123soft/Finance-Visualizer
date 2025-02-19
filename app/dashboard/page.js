"use client";
import { useState, useEffect } from "react";
import ExpensesChart from "../components/ExpensesChart";
import CategoryPieChart from "../components/CategoryPieChart";
import BudgetComparisonChart from "../components/BudgetComparisonChart";
import BudgetForm from "../components/BudgetForm";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.ok ? res.json() : Promise.reject(`Error ${res.status}`))
      .then(setTransactions)
      .catch(console.error);

    fetch("/api/budgets")
      .then((res) => res.ok ? res.json() : Promise.reject(`Error ${res.status}`))
      .then(setBudgets)
      .catch(console.error);
  }, []);

  // Group transactions by month
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    if (!acc[monthYear]) {
      acc[monthYear] = { transactions: [], categoryBreakdown: {}, total: 0 };
    }

    acc[monthYear].transactions.push(transaction);
    acc[monthYear].total += transaction.amount;
    acc[monthYear].categoryBreakdown[transaction.category] =
      (acc[monthYear].categoryBreakdown[transaction.category] || 0) + transaction.amount;

    return acc;
  }, {});

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <div className="container mx-auto max-w-6xl px-4 py-6">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-700">
            &lt;FinanceVisualizer/&gt;
          </h1>
          <p className="text-lg text-gray-600">Your Own Finance-Visualizer</p>
        </div>

        {/* Budget Form */}
        <div className="w-full max-w-3xl mx-auto">
          <BudgetForm refreshBudgets={() => fetch("/api/budgets").then(res => res.json()).then(setBudgets)} />
        </div>

        {/* Transactions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {Object.entries(groupedTransactions).map(([month, data]) => {
            const monthBudgets = budgets.filter(budget => budget.month === month);
            return (
              <div key={month} className="p-5 border rounded-lg shadow-md bg-white">
                <h2 className="text-lg sm:text-xl font-bold text-green-700">{month}</h2>
                <p className="text-gray-700 text-sm sm:text-base">
                  Total Expenses: <span className="font-semibold">${data.total.toFixed(2)}</span>
                </p>

                <ExpensesChart transactions={data.transactions} />
                <CategoryPieChart transactions={data.transactions} />
                <BudgetComparisonChart transactions={data.transactions} budgets={monthBudgets} />

                {/* Category Breakdown */}
                <h3 className="text-base sm:text-lg font-semibold mt-4">Category Breakdown:</h3>
                <ul className="text-gray-700 text-sm sm:text-base">
                  {Object.entries(data.categoryBreakdown).map(([category, amount]) => (
                    <li key={category}>{category}: <span className="font-semibold">${amount.toFixed(2)}</span></li>
                  ))}
                </ul>

                {/* Recent Transactions */}
                <h3 className="text-base sm:text-lg font-semibold mt-4">Recent Transactions:</h3>
                <ul className="text-gray-700 text-sm sm:text-base">
                  {data.transactions.slice(-3).map((t, index) => (
                    <li key={index}>{t.description} - <span className="font-semibold">${t.amount.toFixed(2)}</span></li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
