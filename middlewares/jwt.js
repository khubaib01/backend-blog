import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function jwtVerify(req, res, next) {
  const { authorization } = req.headers;
  console.log(authorization);
  try {
    const token = authorization?.split(" ")[1];
    const decoded = jwt.verify(String(token), String(process.env.JWT_SECRET));
    req.userId = decoded;
    next();
  } catch {
    next("authentication failure");
  }
}
