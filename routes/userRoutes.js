import { Router } from "express";
import {
  addUser,
  deleteUser,
  updateUser,
  userLogin,
  getAvater,
} from "../controllers/userControllers.js";
import { jwtVerify } from "../middlewares/jwt.js";

export const userRouter = Router();

userRouter
  .post("/avatar/:id", jwtVerify, getAvater)
  .post("/", addUser)
  .post("/login", userLogin)
  .patch("/:id", jwtVerify, updateUser)
  .delete("/:id", jwtVerify, deleteUser);
