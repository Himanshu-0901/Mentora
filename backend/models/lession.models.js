import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
   title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    mentorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Mentor",
        required:true
    }
})

const lesson = mongoose.model("Lesson",lessonSchema)
export default lesson;