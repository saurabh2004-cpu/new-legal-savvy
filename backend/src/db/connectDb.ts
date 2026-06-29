import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
    try {
        // await mongoose.connect(MONGODB_URI!);
        await mongoose.connect('mongodb+srv://saurabh:saurabh%402004@cluster0.8edpamc.mongodb.net/');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        throw error;
    }
}