import User from "../models/User.js";
import bcrypt from "bcrypt";
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = User.findOne({ email });
  if (existingUser) {
    res.status(409).json({
      message: "User all ready Exists",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = User.create({
    name,
    email,
    password: hashPassword,
    role: "user",
  });
  return res.status(201).json({
    message: "User registered successfully",
  });
};
