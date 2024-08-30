import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Import the Listings model
import Listings from "../models/listings.model.js";

// Import the data file with JSON assertion
import data from "./listings.json" assert { type: "json" };

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Successfully connected to the database");
});

// Insert sample data into the database
const initDB = async () => {
  try {
    // Clean existing data from the database
    await Listings.deleteMany({});

    // Insert new data into the database
    await Listings.insertMany(data);
    console.log("Successfully inserted");
  } catch (err) {
    console.error(err);
  } finally {
    // Close the connection after inserting data
    mongoose.connection.close();
  }
};

initDB();
