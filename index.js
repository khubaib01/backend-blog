import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRouter } from "./routes/userRoutes.js";
import { postRouter } from "./routes/postRoutes.js";
import { connectDB } from "./connect.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
mongoose.set("strictQuery", false);

app.get("/", (req, res) => {
  res.send("OK");
});

connectDB()
  .then(() => app.listen(PORT))
  .catch((e) => console.error(e));
