import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    async function FetchTransaction() {
      try {
        const response = await fetch("/api/transactions");
        if (!response.ok) {
          throw new Error(`HTTP error! status ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response type, expected JSON");
        }

        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error("Error Fetching transactions:", err.message);
      }
    }
    FetchTransaction();
  }, []);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction._id);
    setUpdatedData(transaction);
  };

  const handleUpdate = async () => {
    const res = await fetch(`/api/transactions?id=${editingTransaction}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const updatedTransaction = await res.json();
      setTransactions(
        transactions.map((t) =>
          t._id === editingTransaction ? updatedTransaction : t
        )
      );
      setEditingTransaction(null);
    } else {
      toast.error("Error updating transaction");
    }
  };

  const handleDelete = async (transactionId) => {
    const res = await fetch(`/api/transactions?id=${transactionId}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.success) {
      setTransactions(transactions.filter((t) => t._id !== transactionId));
      toast.success("Transaction deleted!");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
      <h2 className="font-bold text-2xl pb-5 text-center">Your Transactions</h2>

      <div className="w-full max-w-4xl bg-green-100 overflow-hidden border border-gray-300 rounded-2xl shadow-md">
        <div className="overflow-x-auto">
          <table className="table-auto w-full min-w-[600px]">
            <thead className="bg-green-900 text-white sticky top-0">
              <tr>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Edit</th>
                <th className="py-2 px-4">Delete</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t._id} className="text-center border-b border-gray-200">
                  <td className="py-2 px-4">{t.date.split("T")[0]}</td>
                  <td className="py-2 px-4">
                    {editingTransaction === t._id ? (
                      <input
                        className="w-full p-2 border rounded-md"
                        value={updatedData.description}
                        onChange={(e) =>
                          setUpdatedData({
                            ...updatedData,
                            description: e.target.value,
                          })
                        }
                      />
                    ) : (
                      t.description
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editingTransaction === t._id ? (
                      <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        value={updatedData.amount}
                        onChange={(e) =>
                          setUpdatedData({ ...updatedData, amount: e.target.value })
                        }
                      />
                    ) : (
                      `$${t.amount}`
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editingTransaction === t._id ? (
                      <select
                        className="w-full p-2 border rounded-md"
                        value={updatedData.category}
                        onChange={(e) =>
                          setUpdatedData({ ...updatedData, category: e.target.value })
                        }
                      >
                        <option value="Food">Food</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Transport">Transport</option>
                      </select>
                    ) : (
                      t.category
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editingTransaction === t._id ? (
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-full transition-all duration-300"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(t)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} transition={Bounce} />
    </div>
  );
};

export default TransactionList;
