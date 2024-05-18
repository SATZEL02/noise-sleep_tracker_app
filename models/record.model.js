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
        default:0           /*change default value if need be*/
    }
}, {
    timestamps: true,       /*set to true as timestamps are necessary for record retrievals*/
    versionKey: false       /*set to true if want to createe version key in the record*/  
});

const Record = mongoose.model('Record',recordSchema);

export default Record;