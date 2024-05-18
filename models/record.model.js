import mongoose from "mongoose";

//UserId is of type String and Hours is of type number, timestamps are assigned by database which makes easier to keep track of records
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