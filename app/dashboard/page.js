'use client'
import React, { useState } from 'react';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Header from '@/components/header';

const ExpenseTracker = () => {
    const [date, setDate] = useState(new Date())
    const [expenseName, setExpenseName] = useState('')
    const [expenseAmount, setExpenseAmount] = useState('')
    const [expenseCategory, setExpenseCategory] = useState('')

    const expenseCategories = [
        'Clothes',
        'Family Savings',
        'Food',
        'Hostel',
        'Miscellaneous'
    ]

    const handleAddExpense = async () => {
        console.log(date, expenseName, expenseAmount, expenseCategories)
        try {
            const data = await fetch('/api/addexpense', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ expenseDate: date, expenseName, expenseAmount, expenseCategory: expenseCategory })
            })
            const res = await data.json();
            if(res){
                alert(res.message)
            }
        } catch (error) {
            console.log(error)
        }

        setExpenseName('')
        setExpenseAmount('')
        setExpenseCategory('')
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <Header />
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {/* Date Picker */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full md:w-[280px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                {/* Add New Expense Dialog */}
                <Dialog className='bg-white'>
                    <DialogTrigger asChild>
                        <Button className="w-full md:w-auto">
                            Add New Expense
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Expense</DialogTitle>
                            <DialogDescription>
                                Enter the details of your new expense
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {/* Expense Name Input */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="" className="text-right">
                                    Expense Date
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full md:w-[280px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="expenseName" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="expenseName"
                                    value={expenseName}
                                    onChange={(e) => setExpenseName(e.target.value)}
                                    placeholder="Enter Expense Name"
                                    className="col-span-3"
                                />
                            </div>

                            {/* Expense Amount Input */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="expenseAmount" className="text-right">
                                    Amount
                                </Label>
                                <Input
                                    id="expenseAmount"
                                    type="number"
                                    value={expenseAmount}
                                    onChange={(e) => setExpenseAmount(e.target.value)}
                                    placeholder="Enter Expense Amount"
                                    className="col-span-3"
                                />
                            </div>

                            {/* Expense Category Select */}

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="expenseCategory" className="text-right">
                                    Category
                                </Label>
                                <Select
                                    value={expenseCategory}
                                    onValueChange={(value) => setExpenseCategory(value)} // Make sure you pass the correct value
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {expenseCategories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                onClick={handleAddExpense}
                                disabled={!expenseName || !expenseAmount || !expenseCategory}
                            >
                                Add Expense
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default ExpenseTracker;