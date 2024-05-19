import { errorHandler } from '../utils/error.js';

//Function to Create a new Record in database, accepts userId and hours in request body 
export const createRecords = async(req,res,next) =>{
    //dependency Injection
    const database = req.database;


    const {userId,hours} = req.body;
    if(!userId || !hours){
        return res.status(400).json({success:false,message:"Insufficient Record Details"});
    }
    try{
        //record Id is automatically assigned by MongoDB, so it's convienient to just keep track of database assigned record Id rather than assigning new and unique ids to each record. 
        const newRecord = await database.createRecord(userId,hours);
        res.status(200).json({message:"Record Created Successfully!", recordId:newRecord._id});
    } catch(error){

        //MongoDb returns statusCode and error message if something goes wrong and is to be returned directly to user with error data
        next(error)

    }
}


export const getRecords = async(req,res,next) =>{
    //dependency Injection
    const database = req.database;

    try{
    //sort can use multiple values such as: "createdAt", "updatedAt", "hours", default value is "createdAt" but can be changed according to user convienience  
    const sortBy = req.body.sort || "createdAt";
    //Ascending order can also be followed
    const orderBy = req.body.order || "desc";

    if(!req.params.userId){
        return next(errorHandler(400,"Insufficient Information"));
    }

    const records = await database.getRecordsFromUserId(req.params.userId,sortBy,orderBy);

    //If no record is found it will return a empty object, so frontend needs to check record length for proper UI implementation
    res.status(200).json(records);
    }catch(error){
        next(error);
    }
}


export const deleteRecord = async(req,res,next) =>{
    //dependency Injection
    const database = req.database;
    try{   
        if(!req.params.recordId){
            return next(errorHandler(400,"Insufficient Information"));
        }
        //Returns True if record is found else false
        //if record Id is not of appropriate length of Id attribute of mongoDB database, it will return error message of invalid id cast.
        const record = await database.getRecordFromRecordId(req.params.recordId);
        //errorHandler if recordId does not matches
        if(record === false){
            return next(errorHandler(401,"Record Not Found!"));
        }
        await database.deleteRecordById(req.params.recordId);
        res.status(200).json({message:"Record Deleted Successfully!"});
    }catch(error){
        //usual error will be invalid cast of record id
        next(error)
    }
}