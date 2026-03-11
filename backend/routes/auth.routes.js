import express from 'express';
import { signup,login,logout} from '../controller/auth.controller.js';

const authRoutes = express.Router();

authRoutes.post('/login',login)
authRoutes.post('/logout',logout)
authRoutes.post('/signup',signup)

export default authRoutes;