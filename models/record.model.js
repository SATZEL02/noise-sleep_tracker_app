import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    hours:{
        type:Number,
        required:true,
        default:0
    }
}, {timestamps: true});

const Record = mongoose.model('Record',recordSchema);

export default Record;