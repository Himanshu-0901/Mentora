import express from 'express';
import { bookLesson, createStudent,getAllStudents } from '../controller/parent.controller.js';
import { protectRoute } from '../middleware/protectRoute.middleware.js';
const parentRoutes = express.Router();

parentRoutes.post('/create',protectRoute,createStudent)
parentRoutes.get('/getAll',protectRoute,getAllStudents)
parentRoutes.post('/bookings/:lessonId',protectRoute,bookLesson)

export default parentRoutes;