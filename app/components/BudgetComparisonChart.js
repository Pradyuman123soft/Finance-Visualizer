import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register the required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BudgetComparisonChart({ transactions, budgets }) {
  const budgetMap = budgets.reduce((acc, budget) => {
    acc[budget.category] = budget.amount;
    return acc;
  }, {});

  const categoryExpenses = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  const categories = [...new Set([...Object.keys(budgetMap), ...Object.keys(categoryExpenses)])];

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Budget",
        data: categories.map((category) => budgetMap[category] || 0),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Actual Expenses",
        data: categories.map((category) => categoryExpenses[category] || 0),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to resize dynamically
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 12 },
        },
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 12 } },
      },
      y: {
        ticks: { font: { size: 12 } },
      },
    },
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Budget vs Actual</h3>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[300px] h-[300px] md:h-[400px]">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
