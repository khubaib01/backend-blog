import { Router } from "express";
import {
  addUser,
  deleteUser,
  updateUser,
  userLogin,
} from "../controllers/userControllers.js";
import { jwtVerify } from "../middlewares/jwt.js";

export const userRouter = Router();

userRouter
  .post("/", addUser)
  .post("/login", userLogin)
  .patch("/:id", jwtVerify, updateUser)
  .delete("/:id", jwtVerify, deleteUser);
