import {Router} from 'express';

const api = Router();
import odeme from "../models/odeme";
import { msg } from "./responseMsgs";
import mongoose from './connect';

export const odemeModel = mongoose.model("odeme", odeme);

api.post("/", (req, res) => {
    const Odemekayit = new odemeModel(req.body);
    Odemekayit.save(function (err, result) {
      if (err) {
        res.json({ msg: msg.error });
      } else {
        res.json({ msg: msg.createdSucess });
      }
    });
});

export default api;