import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },
    lessonId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lesson",
        required:true   
    }
})

const booking = mongoose.model("Booking",bookingSchema)
export default booking;