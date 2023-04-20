import mongoose from "mongoose";

const { Schema } = mongoose;

const login = new Schema({
  email:  {type: String},
  parola: {type: String,required: true,default:"abc"},
  ad: {type: String}
});
export default login;
