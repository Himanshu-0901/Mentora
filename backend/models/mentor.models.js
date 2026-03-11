import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    role:{
        type:String,
        required:true
    }
})

const mentor = mongoose.model("Mentor",mentorSchema)
export default mentor;