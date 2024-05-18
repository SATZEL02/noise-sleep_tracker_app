import express from "express";
import {createRecord,getRecords,deleteRecord} from "../controllers/record.controller.js";

const router = express.Router();

//Before Giving access to database, need to implement a feature of user validation 
router.post('/sleep',createRecord);
router.get('/getRecord/:userId',getRecords);
router.delete('/deleteRecord/:recordId',deleteRecord);


export default router;