import Record from "../models/record.model.js";
import { errorHandler } from '../utils/error.js';

export const createRecord = async(req,res,next) =>{
    const {userId,hours} = req.body;
    try{
        const newRecord = new Record({userId,hours});
        await newRecord.save();
        res.status(201).json({message:"Record Created Successfully!"});
    } catch(error){
        next(error)
    }
}

export const getRecords = async(req,res,next) =>{
    try{
        const sort = req.body.sort || "createdAt";
        const order = req.body.order || "desc";
        const records = await Record.find({userId:req.params.userId}).sort(
            {
                [sort]:order
            }
        );
        res.status(200).json(records);
    }catch(error){
        next(error);
    }
}

export const deleteRecord = async(req,res,next) =>{
    try{   
        const record = await Record.findById(req.params.recordId);
        if(record === null){
            return next(errorHandler(404,"Record Not Found!"));
        }
        await Record.findByIdAndDelete(req.params.recordId);
        res.status(200).json({message:"Record Deleted Successfully!"});
    }catch(error){
        next(error)
    }
}