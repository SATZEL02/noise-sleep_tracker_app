import express from 'express';
import mongoose from 'mongoose';
import cors  from 'cors';
import dotenv from 'dotenv';
dotenv.config();


//Import Router from routes folder
import recordRouter from "./routes/record.route.js";



//Connect server to MonogDb Cloud
mongoose
    .connect(process.env.MONGODB_URL).then(() => {
        console.log("Connected to MongoDB!");
    })
        .catch((err) => {
            console.error("Error connecting to MongoDB: " + err);
        }
        );


//Define app and handle json data parsing
const app = express();
app.use(express.json());
app.use(cors());

//Port set to 3000 for development purpose and local hosting
app.listen(3000, ()=>{
    console.log('Server is running on port 3000!');
});


//Handle default Route for production purpose
app.get('/',(req,res)=>{
    res.json({"message":"API Connected", "isValid":true});
});

//Route all record related queries to record Router
app.use('/record',recordRouter);



//Middleware and ErrorHandler
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});