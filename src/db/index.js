import mongoose from "mongoose";
import { db_name } from "../constants.js";
import e from "express";
const connectdb = async () => {
    try {
       const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${db_name}`)
       console.log(`\n Connection establish !! HOST ${connectionInstance.connection.host}`);
//  ${connectionInstance.connection.host} --> means that where ever the connection is done means there are multiple hosts like testing,devlopment etc 
       
    } catch (error) {
        console.error("Error is db :",error);
        process.exit(1)
    }
}
export default connectdb