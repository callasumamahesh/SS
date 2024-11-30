import mongoose from "mongoose";

// Define the schema
let createUserModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,  // Fixed typo: 'required' instead of 'require'
  },
  password: {
    type: String,
    required: true,  // Fixed typo: 'required' instead of 'require'
  },
  confirmPassword: {
    type: String,
    required: true,  // Fixed typo: 'required' instead of 'require'
  },
});

// Check if the model exists, if not, create it
let createUser = mongoose.models.CreateUser || mongoose.model('CreateUser', createUserModel);

export default createUser;
