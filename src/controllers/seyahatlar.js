import {Router} from 'express';

const api = Router();
import seyahatlar from "../models/seyahatlar";
import { msg } from "./responseMsgs";
import mongoose from './connect';

const seyahatlarModel = mongoose.model("seyahatlar", seyahatlar);

api.post("/", (req, res) => {
  console.log(req.body.fromTo);
  seyahatlarModel.find({ fromTo: req.body.fromTo,Tarih:{$eq: req.body.tarih} }, function (err, docs) {
    if (err) return res.json({ msg: msg.error });
    console.log(docs)
    if(docs.length===0) return res.json({msg: msg.ThereIsNoRecords})
    res.json({ results: docs, msg: msg.ok });
  });
});

export default api;