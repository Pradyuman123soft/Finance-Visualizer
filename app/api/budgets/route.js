import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import Budget from "@/models/Budget";

// export async function GET() {
//     try {
//         await connectDB();
//         const budgets = await Budget.find();
//         console.log("fetched Budget: ",budgets);
//         return NextResponse.json(budgets, {status: 200});
//     } catch (error) {
//         console.error("Error to fetch Budget", error);
//         return NextResponse.json(
//             {error: "Internal server error"},
//             {status: 500},
//         )
//     }
// };

// export async function POST(req) {
//     try {
//         await connectDB();
//         const { category, amount } = await req.json();
//         if(!category || !amount ){
//             console.error("Missing Required fields");
//             return NextResponse.json(
//                 {error:" All fields are Required"},
//                 {status: 400},
//             )            
//         }
//         const newBudgets = new Budget({category,amount});
//         await newBudgets.save();
//         return NextResponse.json(newBudgets, { status:201 });
//     } catch (error) {
//         console.error("Error: Saving data", error);
//         return NextResponse(
//             {error: "Internal Server Error"},
//             {status : 500},
//         )
//     }
// }




// Handle POST request (Create Budget)
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { category, amount, month } = body;

    if (!category || !amount || !month) {
      return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
    }

    // ✅ Check if a budget for this category & month already exists
    const existingBudget = await Budget.findOne({ category, month });

    if (existingBudget) {
      // ✅ If found, update the existing budget
      existingBudget.amount = amount;
      await existingBudget.save();
      console.log("✅ Updated existing budget:", existingBudget);
      return NextResponse.json(existingBudget, { status: 200 });
    }

    // ✅ If not found, create a new budget
    const newBudget = new Budget({ category, amount, month });
    await newBudget.save();
    console.log("✅ New budget saved:", newBudget);
    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    console.error("❌ Error saving budget:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}


// Handle GET request (Fetch Budgets)
export async function GET() {
  try {
    await connectDB(); // Ensure MongoDB connection
    const budgets = await Budget.find();

    return NextResponse.json(budgets, { status: 200 });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

