import mongoose from 'mongoose';

const parentSchema = new mongoose.Schema({
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

const parent = mongoose.model("Parent",parentSchema)
export default parent;