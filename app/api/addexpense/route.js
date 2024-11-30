import connectDb from "@/lib/db";
import newExpense from "@/models/expensemodel";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        await connectDb();  // Ensure the DB connection is established

        // Extract data from the request body
        const { expenseDate, expenseName, expenseAmount, expenseCategory } = await req.json();
        console.log(expenseDate, expenseName, expenseAmount, expenseCategory,'Data Expense');

        // Create a new expense entry
        const createNewExpense = await newExpense.create({
            expenseDate,
            expenseName,
            expenseAmount,
            expenseCategory,
        });

        // Return a success response
        return NextResponse.json({message:'Expense Added'})
    } catch (error) {
        console.error("Error adding expense:", error);
        return NextResponse.json({ message: "Failed to add expense", error: error.message });
    }
}
