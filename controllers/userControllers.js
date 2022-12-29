import { ZLoginObject, ZUserObject } from "../middlewares/zod.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addUser = async (req, res) => {
  const zodResponse = ZUserObject.safeParse(req.body);
  if (zodResponse.success) {
    try {
      await User.create(req.body);
      res.json({ status: "ok" });
    } catch {
      res.json({ status: "error tc" });
    }
  } else {
    res.json({ status: "error zod" });
  }
};

export const getAvater = async (req, res) => {
  const id = req.userId;
  try {
    const target = await User.findById(id.userId);
    res.json({ status: "ok", avatar: target.avatar });
  } catch {
    res.json({ status: "error" });
  }
};
export const userLogin = async (req, res) => {
  const zodResponse = ZLoginObject.safeParse(req.body);
  if (zodResponse.success) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          const token = jwt.sign(
            { userId: user._id },
            String(process.env.JWT_SECRET),
            { expiresIn: "1h" }
          );
          res.json({ status: "ok", access_token: token });
        } else {
          res.json({ status: "error" });
        }
      } else {
        res.json({ status: "error" });
      }
    } catch {
      res.json({ status: "error" });
    }
  } else {
    res.json({ status: "error" });
  }
};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate({ id }, req.body);
    res.json({ status: "ok" });
  } catch {
    res.json({ status: "error" });
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete({ id });
    res.json({ status: "ok" });
  } catch {
    res.json({ status: "error" });
  }
};
