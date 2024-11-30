import mongoose from "mongoose";

const createNewExpense = mongoose.Schema({
    expenseDate:{
        type:Date,
        required:true,
    },
    expenseName:{
        type:String,
        required:true,
    },
    expenseAmount:{
        type:Number,
        required:true,
    },
    expenseCategory:{
        type:String,
        required:true,
    }
})

const newExpense = mongoose.models.newExpense || mongoose.model('newExpense',createNewExpense)

export default newExpense;