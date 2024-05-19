/* Database related functions and queries handled in this file*/

import mongoose from 'mongoose';
import Record from "../models/record.model.js";
import dotenv from 'dotenv';
dotenv.config();

//Connect server to MonogDb Database
mongoose
    .connect(process.env.MONGODB_URL).then(() => {
        console.log("Connected to MongoDB!");
    })
        .catch((err) => {
            console.error("Error connecting to MongoDB: " + err);
        }
        );


//Creates a new entry in the database and handles error subsequently 
export async function createRecord(userId,hours) {
    try{
        const newRecord = new Record({userId,hours});
        await newRecord.save();
        return newRecord;
    } catch(error){
        throw error;
    }
}

//Retrieves a Record by record Id
export async function getRecordFromRecordId(recordId){
    try{
        const record = await Record.findById(recordId);
        if(record===null)   return false;
        return true;
    } catch(error){
        throw error;
    }
}

//Retrieves all records of a user from the database, If no record is found returns a empty object
export async function getRecordsFromUserId(userId,sortBy,orderBy){
    try{
        const records = await Record.find({userId}).sort(
            {
                [sortBy]:orderBy
            }
        );
        return records;
    } catch(error){
        throw error;
    }
}

//Deletes a record by Record Id
export async function deleteRecordById(recordId){
    try{
        await Record.findByIdAndDelete(recordId);
    } catch(error){
        throw error;
    }
}