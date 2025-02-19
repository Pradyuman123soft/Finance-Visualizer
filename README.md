# Finance Visualizer

## Overview
Finance Visualizer is a **personal finance management tool** built with **Next.js** and **Tailwind CSS**. It allows users to **track their expenses, set budgets, and analyze financial data visually** using various charts. The project includes authentication, real-time updates, and a dashboard for data visualization.

## Features
- 💰 **Expense Tracking** - Users can add, edit, and delete transactions.
- 📊 **Category-based Pie Chart** - Displays expenses by category with unique colors.
- 📉 **Budget Comparison Chart** - Visualizes budget vs. actual spending.
- 🔄 **Real-time Updates** - Reflects changes instantly on the dashboard.
- 🔐 **Authentication System** - Secure user login using `AuthPage`.
- 📅 **Monthly Breakdown** - Groups transactions by month for better analysis.

## Tech Stack
- **Frontend**: Next.js, React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Charts**: Recharts (PieChart, BarChart, LineChart)
- **API**: RESTful API with JSON responses

## Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/finance-visualizer.git
cd finance-visualizer
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file in the root directory and add:
```env
MONGO_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 4️⃣ Run the Development Server
```sh
npm run dev
```
Visit **`http://localhost:3000`** in your browser.

## Folder Structure
```
finance-visualizer/
│── components/
│   ├── AuthPage.js
│   ├── ExpensesChart.js
│   ├── CategoryPieChart.js
│   ├── BudgetComparisonChart.js
│   ├── TransactionForm.js
│   ├── TransactionList.js
│── pages/
│   ├── index.js  (Landing Page + Login)
│   ├── dashboard.js  (Dashboard with charts)
│   ├── transactions.js  (Transaction tracking page)
│── api/
│   ├── transactions.js (CRUD API for transactions)
│   ├── budgets.js (CRUD API for budgets)
│── styles/ (Tailwind styling)
│── public/ (Assets, icons)
│── .env.local (Environment variables)
│── package.json
│── README.md
```

## API Endpoints
### 🚀 Transactions API
- **GET /api/transactions** → Fetch all transactions
- **POST /api/transactions** → Add a new transaction
- **PUT /api/transactions/:id** → Update a transaction
- **DELETE /api/transactions/:id** → Delete a transaction

### 🎯 Budgets API
- **GET /api/budgets** → Fetch all budgets
- **POST /api/budgets** → Set a new budget

## Contribution Guidelines
1. **Fork** the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and **commit**: `git commit -m 'Added new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Submit a **Pull Request**!

