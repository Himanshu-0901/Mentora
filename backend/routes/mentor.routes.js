import express from 'express';
import { createLesson,createSession } from '../controller/mentor.controller.js';
import { protectRoute } from '../middleware/protectRoute.middleware.js';

const mentorRoutes = express.Router();

mentorRoutes.post('/create',protectRoute,createLesson)
mentorRoutes.post('/createSession/:lessonId',protectRoute,createSession)

export default mentorRoutes;