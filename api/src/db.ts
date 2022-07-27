import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  try{
    const db= await mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@sbschallenge.vs2kjtc.mongodb.net/?retryWrites=true&w=majority`,{

    });
      console.log("connected to database :", db.connection.name);
  }catch(error)
   {console.error(error)}
})();