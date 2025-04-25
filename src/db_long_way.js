//Conncecting to the db

// Points to be noted
//  1.when we work with db there are chance for the errors so use try catch / Promises
//  2. it always take time so use async and wait
import mongoose from 'mongoose'
import { db_name } from './constants';
import express from 'express'

const app = express()

( async () => {
    try {
       await mongoose.connect(`${process.env.DB_URL}/${db_name}`)
       //App listeners
       app.on("error",(error)=>{
        console.log("Error in talking to db ",error);
        throw new Error("Error occured:",error);
        app.listen(process.env.PORT,()=>{
            console.log("Porting on : ${process.env.PORT}");
            
        })
       })
    } catch (error) {
        console.error("Error is : ",error);
        
    }
} )()


// IN THIS THE WHOLE CODE IS IN THE MAIN INDEX.JS 