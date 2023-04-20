
import { Router } from "express";
import yeniKayit from "../models/yeniKayit";
import { msg } from "./responseMsgs";
import mongoose from "./connect";
import { SALT_ROUNDS } from "./security";
const api = Router();
const kayitModel = mongoose.model("yeniKayit", yeniKayit);
const bcrypt = require("bcrypt");
const saltRounds = parseInt(SALT_ROUNDS);

api.post("/", (req, res) => {
  const myPlaintextPassword = req.body.parola || "root";
  bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    req.body.parola = hash;
    req.session.hash = hash;
    const kayit = new kayitModel(req.body);
    kayit.save(function (err, result) {
      if (err) {
        console.log(err)
        let ert = err.toString().search("duplicate key");
        if(ert!==-1)
        res.json({ msg: msg.DuplicateEmail });
        else res.json({msg: ert})
      } else {
        res.json({ msg: msg.createdSucess });
      }
    });
  });
});

export default api;