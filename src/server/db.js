import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MONGODB_URI } from './config/dbConfig.js';

dotenv.config();

const connectDB = async () => {
  try {
    // Use the configured URI or fallback to environment
    const uri = process.env.MONGODB_URI || MONGODB_URI;
    
    // Check if MONGODB_URI is defined
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables or config');
    }

    console.log(`Attempting to connect to: ${uri}`); // Debug log
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;