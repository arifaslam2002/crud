import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import authRoutes from "./routes/authRoute.js"
dotenv.config();
const app = express();
connectDb();
app.use(express.json());
app.use("/api/auth",authRoutes)
const PORT = process.env.PORT;
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running in PORT ${PORT}`);
});
