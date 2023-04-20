import mongoose from 'mongoose';
import { mongo_uri } from './security';
mongoose.connect(mongo_uri);
module.exports = mongoose;




