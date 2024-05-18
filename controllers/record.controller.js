import Record from "../models/record.model.js";
import { errorHandler } from '../utils/error.js';

//Function to Create a new Record in database, accepts userId and hours in request body 
export const createRecord = async(req,res,next) =>{
    const {userId,hours} = req.body;
    try{

        //record Id is automatically assigned by MongoDB, so it's convienient to just keep track of database assigned record Id rather than assigning new and unique ids to each record. 
        const newRecord = new Record({userId,hours});
        await newRecord.save();

        res.status(200).json({message:"Record Created Successfully!"});

    } catch(error){

        //MongoDb returns statusCode and error message if something goes wrong and is to be returned directly to user with error data
        next(error)

    }
}


export const getRecords = async(req,res,next) =>{
    try{
        //sort can use multiple values such as: "createdAt", "updatedAt", "hours", default value is "createdAt" but can be changed according to user convienience  
        const sort = req.body.sort || "createdAt";
        //Ascending order can also be followed
        const order = req.body.order || "desc";


        const records = await Record.find({userId:req.params.userId}).sort(
            {
                [sort]:order
            }
        );


        //If no record is found it will return a empty object, so frontend needs to check record length for proper UI implementation
        res.status(200).json(records);
    }catch(error){
        next(error);
    }
}


export const deleteRecord = async(req,res,next) =>{
    try{   
        //if record Id is not of appropriate length of Id attribute of mongoDB database, it will return error message of invalid id cast. 
        const record = await Record.findById(req.params.recordId);
        //errorHandler if recordId does not matches
        if(record === null){
            return next(errorHandler(404,"Record Not Found!"));
        }
        
        await Record.findByIdAndDelete(req.params.recordId);
        res.status(200).json({message:"Record Deleted Successfully!"});
    }catch(error){
        next(error)
    }
}