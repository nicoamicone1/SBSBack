import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  try{
    const db= await mongoose.connect(`mongodb+srv://itcrowdchallenge:${process.env.DBPASS}@itcrowd.ksksrnv.mongodb.net/Challenge`,{

    });
      console.log("connected to database :", db.connection.name);
  }catch(error)
   {console.error(error)}
})();