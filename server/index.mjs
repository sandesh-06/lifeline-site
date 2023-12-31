import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"; //to access env variables
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.routes.mjs'
import userRouter from './routes/user.routes.mjs'
import familyRouter from './routes/family.routes.mjs'
import reportRouter from './routes/medicalReport.routes.mjs'
import cors from "cors"
//CONFIGURATIONS
dotenv.config();
const app = express();
app.use(cors())

const PORT = process.env.PORT;

app.use(express.json()); //without this we cannot send or receive json using api calls
app.use(cookieParser())
//ROUTES
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/family", familyRouter);
app.use("/api/report", reportRouter);

//A COMMON MIDDLEWARE TO HANDLE ERROR
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const msg = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message: msg
    })
})

// MONGOOSE SETUP
const connectToMongo = async()=>{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected!")
}
connectToMongo().catch((error)=>{console.log("Error connecting to database", error.message)})

//SERVER LISTEN
app.listen(PORT, ()=>console.log(`Server Port: ${PORT}`))