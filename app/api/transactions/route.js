export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Transaction from "@/models/Transaction";
import connectDB from "@/db/connectDB";

export async function GET() {
  await connectDB();
  
  try {
    const transactions = await Transaction.find({});
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch transactions" }, { status: 500 });
  }
}
export async function POST(req) {
    try {
        await connectDB();
        const{ amount, date, description, category } = await req.json();
        if(!amount || !date || !description || !category){
            console.error("all fields are required");
            alert("All Fields Are Required")
            return NextResponse.json(
                {error: "Missing Required Fields "},
                {status : 400},
            )
        }
        const newTransactions = new Transaction({amount, date, description, category});
        await newTransactions.save();
        return NextResponse.json(newTransactions,{status: 201});
    } catch (error) {
        console.error("Error to save transaction ", error);
        return NextResponse(
            {error:"Internal server Error"},
            {status: 500},
        )
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const transactionId = searchParams.get("id")
        if(!transactionId){
            return NextResponse.json({success: false, message: "Id required to Delete"}, {status: 400})
        }
        const deleteTransaction = await Transaction.findByIdAndDelete(transactionId)

        if (!deleteTransaction) {
            return NextResponse.json({success: false, message: "Transaction cannot find"}, {status: 404})
        }
        return NextResponse.json({success: true, message: "Transaction delete successfully"});
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error deleting Transaction" }, { status: 500 });
    }
}

// PUT - Update a transaction
export async function PUT(req) {
    try {
      const { searchParams } = new URL(req.url);
      const transactionId = searchParams.get("id");
  
      if (!transactionId) {
        return NextResponse.json(
          { success: false, message: "Transaction ID is required" },
          { status: 400 }
        );
      }
  
      const updatedData = await req.json();
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        transactionId,
        updatedData,
        { new: true }
      );
  
      if (!updatedTransaction) {
        return NextResponse.json(
          { success: false, message: "Transaction not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(updatedTransaction);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
  }