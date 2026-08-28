import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGOURI = process.env.MONGOURI;

const db = async () => {
  try {
    await mongoose.connect(MONGOURI);
    console.log("database created succesfully");
  } catch (error) {
    console.log(`database error: ${error}`);
  }
};

export default db;
