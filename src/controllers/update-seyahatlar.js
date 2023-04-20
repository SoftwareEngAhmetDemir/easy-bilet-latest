import { Router } from "express";

const api = Router();
import seyahatlar from "../models/seyahatlar";
import { msg } from "./responseMsgs";
import mongoose from "./connect";

const seyahatlarModel = mongoose.model("seyahatlar", seyahatlar);
api.post("/", (req, res) => {
  var id = req.body._id;

  seyahatlarModel.findByIdAndUpdate(
    id,
    {
      $addToSet: {
        filled: req.body.numberOfSeat,
      },
    },
    function (err, docs) {
      if (err) return res.json({ msg: msg.error });
      res.json({ results: docs, msg: msg.ok });
    }
  );
});

export default api;
