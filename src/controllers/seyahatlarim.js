import { Router } from "express";

const api = Router();
import seyahatlarim from "../models/seyahatlarim";
import { msg } from "./responseMsgs";
import mongoose from './connect';

const seyahatlarimModel =
  mongoose.models.odeme || mongoose.model("odeme", seyahatlarim);

api.post("/", (req, res) => {
  let start = req.body.start ; // number of page we are in
  let end = req.body.end ; // last page

  Promise.all([
    seyahatlarimModel
      .find({ email: req.body.email })
      .limit(end)
      .skip(start*(end)),
    seyahatlarimModel.find({ email: req.body.email }).count(),
  ])
    .then(([records, recordNumbers]) => {
  
      res.json({msg: msg.ok, records, maxRecordNumbers: recordNumbers });
    })
    .catch((err) => res.json({ msg: msg.error }));
});

export default api;
