import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    lessonId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lesson",
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
    topic:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    } 
})  

const session = mongoose.model("Session",sessionSchema)
export default session;