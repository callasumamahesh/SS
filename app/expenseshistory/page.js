'use client'
import React, { useState } from 'react';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Header from '@/components/header';

const ExpenseReport = () => {
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [expenses, setExpenses] = useState([])

  // Sample expenses data (replace with actual data fetching logic)
  const sampleExpenses = [
    {
      date: new Date('2024-02-15'),
      name: 'Groceries',
      amount: 75.50,
      category: 'Food'
    },
    {
      date: new Date('2024-02-16'),
      name: 'New Shirt',
      amount: 45.00,
      category: 'Clothes'
    },
    {
      date: new Date('2024-02-17'),
      name: 'Family Dinner',
      amount: 120.75,
      category: 'Family Savings'
    },
    {
      date: new Date('2024-02-18'),
      name: 'Hostel Supplies',
      amount: 35.25,
      category: 'Hostel'
    }
  ]

  const handleFetchExpenses = () => {
    // In a real application, you would fetch expenses based on date range
    // This is a simple mock implementation
    const filteredExpenses = sampleExpenses.filter(expense => 
      (!fromDate || expense.date >= fromDate) && 
      (!toDate || expense.date <= toDate)
    )
    setExpenses(filteredExpenses)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
        <Header /> 
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* From Date Picker */}
        <div className="flex flex-col space-y-2 w-full md:w-1/2">
          <label className="text-sm font-medium">From Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !fromDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fromDate ? format(fromDate, "PPP") : <span>Pick start date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* To Date Picker */}
        <div className="flex flex-col space-y-2 w-full md:w-1/2">
          <label className="text-sm font-medium">To Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !toDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {toDate ? format(toDate, "PPP") : <span>Pick end date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={toDate}
                onSelect={setToDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Fetch Expenses Button */}
        <div className="flex items-end w-full md:w-auto mt-4 md:mt-0">
          <Button 
            onClick={handleFetchExpenses}
            className="w-full"
          >
            Fetch Expenses
          </Button>
        </div>
      </div>

      {/* Expenses Table */}
      <Table>
        <TableCaption>
          {expenses.length === 0 
            ? "No expenses found for the selected date range" 
            : `Showing ${expenses.length} expense(s)`
        }
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Expense Date</TableHead>
            <TableHead>Expense Name</TableHead>
            <TableHead>Expense Amount</TableHead>
            <TableHead>Expense Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense, index) => (
            <TableRow key={index}>
              <TableCell>{format(expense.date, "PP")}</TableCell>
              <TableCell>{expense.name}</TableCell>
              <TableCell>${expense.amount.toFixed(2)}</TableCell>
              <TableCell>{expense.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ExpenseReport;