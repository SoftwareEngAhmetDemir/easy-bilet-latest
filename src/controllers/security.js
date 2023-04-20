import * as dotenv from 'dotenv'
dotenv.config()

let {mongo_uri,SECRET_KEY,SALT_ROUNDS} = process.env;

export  {mongo_uri,SECRET_KEY,SALT_ROUNDS};