import { ZPostObject } from "../middlewares/zod.js";
import { Post } from "../models/postModel.js";

export const addPost = async (req, res) => {
  req.body.writtenBy = req.userId;
  const zodResponse = ZPostObject.safeParse(req.body);
  if (zodResponse.success) {
    try {
      await Post.create(req.body);
      res.json({ status: "ok" });
    } catch {
      res.json({ status: "error" });
    }
  } else {
    res.json({ status: "error" });
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndUpdate({ id }, req.body);
    res.json({ status: "ok" });
  } catch {
    res.json({ status: "error" });
  }
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete({ id });
    res.json({ status: "ok" });
  } catch {
    res.json({ status: "error" });
  }
};
