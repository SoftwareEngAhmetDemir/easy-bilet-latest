import express from 'express'
const api = express.Router();
import { msg } from "./responseMsgs";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./security";

api.post("/", (req, res) => {
  jwt.verify(req.body.token, SECRET_KEY, function (err, decoded) {
    if (err) {
      if (err.message === "jwt expired") {
        return res.json({
          msg: msg.JwtExpired,
        });
      }
      return res.json({ msg: msg.NoToken });
    } else return res.json({ msg: 200, decoded: decoded });
  });
});

export default api;
