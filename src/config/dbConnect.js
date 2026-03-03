import mongoose from "mongoose";
import { ENV } from "./constant.js";

const connectDB = async () => {
  try {
    const url = ENV.MONGO_URI;
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;