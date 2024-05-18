import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors  from 'cors';
import recordRouter from "./routes/record.route.js";
dotenv.config();


mongoose
    .connect(process.env.MONGODB_URL).then(() => {
        console.log("Connected to MongoDB!");
    })
        .catch((err) => {
            console.error("Error connecting to MongoDB: " + err);
        }
        );

const app = express();
app.use(express.json());
app.use(cors());


app.listen(3000, ()=>{
    console.log('Server is running on port 3000!');
});

app.get('/',(req,res)=>{
    res.json({"message":"API Connected", "isValid":true});
});

app.use('/record',recordRouter);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});