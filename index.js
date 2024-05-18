import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors  from 'cors';
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
app.use(cors());


app.listen(3000, ()=>{
    console.log('Server is running on port 3000!');
});


