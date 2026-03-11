import jwt, { decode } from 'jsonwebtoken';
import parent from '../models/parent.models.js';
import mentor from '../models/mentor.models.js';

export const protectRoute = async(req,res,next)=>{
    try{
        const token = req.cookies.AccessToken;
        
     
        if(!token){
            return res.status(401).json({error:"Unauthorized - No Token Provided."})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decoded){
            return res.status(401).json({error:"Unauthorized - Invalid Token"})
        }
       
        let findUser = await parent.findById(decoded.id).select("-password")
       
        if(!findUser){
            findUser = await mentor.findById(decoded.id).select("-password")
        }

        req.user = findUser
        next();
    }
    catch(error){
        console.log(`Error in protectRoute Middleware - ${error.message}`)
        res.status(501).json({error:"Internal server error"})
    }
};



