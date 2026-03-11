import parent from "../models/parent.models.js";
import mentor from "../models/mentor.models.js";
import bcrypt from "bcryptjs";
import { createNewParent , createNewMentor } from "../utils/createNew.js";
import { generateTokenAndCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (role == "parent") {
      await createNewParent(email, password,role, res);
    } else if (role == "mentor") {
      await createNewMentor(email, password,role, res);
    } else {
      return res.status(400).json({ error: "Invalid User Data - Try Again" });
    }
  } catch (error) {
    console.log(`Error in signup controller - ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export const login = async (req, res) => {
  try {

    let { email, password } = req.body;
    console.log(email,password)


    
    let find = await parent.findOne({ email });
    let user = find ? 'parent' : 'mentor'
    if(!find){
      find = await mentor.findOne({ email });
      if(find) user = 'mentor'
    }

    const isPassword = await bcrypt.compare(password, find?.password || "");

    if (find && isPassword) {
      generateTokenAndCookie(find.id, res);
      return res.status(202).json({
        id: find.id,
        email: find.email,
        role: user
      });
    } else {
      return res.status(400).json({ error: "Invalid userName or Password" });
    }
  } catch (error) {
    console.log(`Error in login Controller - ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
    try{
        res.cookie("AccessToken","",{
            maxAge:0
        })
        res.status(200).json({"message":"Logout Successfully"})
    }
    catch(error){
        console.log(`Error in Logout Controller ${error.message}`)
        res.status(500).json({ error: "Internal Server Error" });
    }
};
