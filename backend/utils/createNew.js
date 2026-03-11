import parent from "../models/parent.models.js";
import mentor from "../models/mentor.models.js";
import bcrypt from "bcryptjs";
import { generateTokenAndCookie } from "../utils/generateToken.js";


export const createNewParent = async (email, password,role, res) => {
  const findUser = await parent.findOne({ email });

  if (findUser) {
    return res.status(400).json({ error: "Parent already exists." });
  }

  // Hash the password here
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newParent = new parent({
    email,
    password: hashPassword,
    role,
  });

  if (newParent) {
    await newParent.save();
    generateTokenAndCookie(newParent.id, res);
    return res.status(201).json({
      id: newParent.id,
      email: newParent.email,
    });
  } else {
    return res.status(400).json({ error: "Invalid User Data - Try Again" });
  }
};

export const createNewMentor = async (email, password,role, res) => {
  const findUser = await mentor.findOne({ email });

  if (findUser) {
    return res.status(400).json({ error: "Mentor already exists." });
  }

  // Hash the password here
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newMentor = new mentor({
    email,
    password: hashPassword,
    role,
  });

  if (newMentor) {
    await newMentor.save();
    generateTokenAndCookie(newMentor.id, res);
    return res.status(201).json({
      id: newMentor.id,
      email: newMentor.email,
    });
  } else {
    return res.status(400).json({ error: "Invalid User Data - Try Again" });
  }
};
