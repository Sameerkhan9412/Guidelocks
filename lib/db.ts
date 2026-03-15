import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB error:", error);
  }
};