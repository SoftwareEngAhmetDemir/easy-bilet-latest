import { Router } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./security";
const api = Router();
api.post("/", (req, res) => {
  let {ad,email} = req.body;
  let token = jwt.sign(
    {
      ad,
      email,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.setHeader("token",token);
  return res.json({msg:token});
});
export default api;