import booking from '../models/booking.models.js';
import student from '../models/student.models.js';

export const createStudent = async (req,res) => {
    try {
        if(req.user.role != 'parent'){
            return res.status(403).json({error:"Forbidden - Access Denied"})
        }

        const { name, age } = req.body;
        if(!name || !age){
            return res.status(400).json({error:"Name and Age are required fields."})
        }

        const newStudent = new student({
            name,
            age,
            parentId:req.user.id
        })

        await newStudent.save();
        res.status(201).json(newStudent)    
    } catch (error) {
        console.error(`Error in createStudent Controller - ${error.message}`)
        res.status(500).json({ error: "Internal Server Error" });
    }
}



export const getAllStudents = async (req,res) => {
    try {
        console.log(req.user)
        if(req.user.role != 'parent'){
            return res.status(403).json({error:"Forbidden - Access Denied"})
        }

        let allStudents = await student.find({parentId:req.user.id})
        res.status(200).json(allStudents)

    } catch (error) {
        console.error(`Error in getAllStudents Controller - ${error.message}`)
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const bookLesson = async (req,res) => {
    try {
        console.log(req.user)
        if(req.user.role != 'parent'){
            return res.status(403).json({error:"Forbidden - Access Denied"})
        }
        const { studentId } = req.body;
        const { lessonId } = req.params;

        await booking.create({
            studentId,
            lessonId
        })  

        res.status(200).json({booking:"Booked Successfully"})
    } catch (error) {
        console.error(`Error in bookLesson Controller - ${error.message}`)
        res.status(500).json({ error: "Internal Server Error" });
    }
}