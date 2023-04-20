import mongoose from "mongoose";

const { Schema } = mongoose;

const yeniKayit = new Schema({
  ad: { type : String , required : true }, // String is shorthand for {type: String}
  soyad: { type : String , required : true },
  email:  { type : String , unique : true, required : true, dropDups: true },
  parola: { type : String , required : true },
});
export default yeniKayit;
