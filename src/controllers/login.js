import express from 'express'
const api = express.Router();
import login from "../models/login";
import { msg } from "./responseMsgs";
import jwt from "jsonwebtoken";
import mongoose from "./connect";
import { SECRET_KEY } from "./security";

const loginModel = mongoose.model("yenikayits", login);
const bcrypt = require("bcrypt");
// const saltRounds = 10;

api.post("/", async (req, res) => {
  const user = await loginModel.findOne({ email: req.body.email });

  if (user) {
    bcrypt.compare(req.body.parola, user.parola, function (err, result) {
      if (err) return res.json({ msg: msg.error });
      if (result === true) {
        let { ad, email } = user._doc;
        let token = jwt.sign(
          {
            ad,
            email,
          },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        req.session.token = token;

        res.append("username", user.ad);
        res.append("token", token);

        return res.json({ msg: msg.ok });
      } else return res.json({ msg: msg.error });
    });
  }
  else return res.json({msg: msg.LoginFaild})
});

export default api;
