import connectDb from "@/lib/db";
import Expense from "@/models/expensemodel";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        await connectDb();  // Ensure the DB connection is established
        const { expenseDate, expenseName, expenseAmount, expenseCategory } = await req.json();
        // Create a new expense entry
        await Expense.create({
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

export async function GET(req, res) {
    try {
        const { searchParams } = new URL(req.url);
        const fromDate = searchParams.get('fromDate');
        const endDate = searchParams.get('endDate');
        if (!fromDate || !endDate) {
            return new Response(
                JSON.stringify({ error: 'Both fromDate and endDate are required.' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Query MongoDB for expenses within the date range
        const expenses = await Expense.find({
            expenseDate: {
                $gte: new Date(`${fromDate}T00:00:00`),   // Start of fromDate
                $lte: new Date(`${endDate}T23:59:59`),   // End of endDate (full day)
            },
        });
        
        return new Response(
            JSON.stringify(expenses),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error fetching expenses:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

