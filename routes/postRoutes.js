import { Router } from "express";
import {
  addPost,
  deletePost,
  updatePost,
} from "../controllers/postControllers.js";
import { jwtVerify } from "../middlewares/jwt.js";

export const postRouter = Router();

postRouter
  .post("/", jwtVerify, addPost)
  .patch("/:id", jwtVerify, updatePost)
  .delete("/:id", jwtVerify, deletePost);
