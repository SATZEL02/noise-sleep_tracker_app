import express from 'express';
import cors  from 'cors';

//Import Router from routes folder
import recordRouter from "./routes/record.route.js";


export default function(database){

    //Define app and handle json data parsing
    const app = express();
    app.use(express.json());
    app.use(cors());
    

    //MiddleWare for dependency injection of Database for routing 
    const exposeDatabase = (req,res,next)=>{
        req.database = database;
        next();
    }

    //Handle default Route for production purpose
    app.get('/',(req,res)=>{
        res.status(201).json({"message":"API Connected", "isValid":true});
    });
    
    //Route all record related queries to record Router
    app.use('/record',exposeDatabase,recordRouter);
    
    
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

    return app;
}