import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Remove unique constraint
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // Ensure each budget is associated with a month
});

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
