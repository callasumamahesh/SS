
import mongoose from 'mongoose';

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to the database");
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw new Error("Failed to connect to database");
  }
};

export default connectDb;
