import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({
      message: "Please Register First",
    });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }
  const token = jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  return res.status(200).json({
    message: "Login Successful",
    token,
  });
};
