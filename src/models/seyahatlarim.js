import mongoose from "mongoose";
const { Schema } = mongoose;

const seyahatlarim = new Schema({
    // _id: {type: String},
    otobusFirmasi: { type : String  }, // String is shorthand for {type: String}
    Tarih: {type: Date},
    fromTo:  { type : String },
    Ucret: { type : Number  }
});
export default seyahatlarim;
