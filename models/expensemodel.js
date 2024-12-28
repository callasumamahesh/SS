import mongoose from "mongoose";
import createUser from "./usermodel";

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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Define the type as ObjectId
        ref: "CreateUser", // Reference to the User collection
        required: true, // Ensure userId is mandatory
    },

})

const Expense = mongoose.models.Expense || mongoose.model('Expense',createNewExpense)

export default Expense;