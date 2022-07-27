import express, { Express, Request, Response,json, NextFunction,urlencoded } from 'express';
import dotenv from 'dotenv';
import router from "./src/routes/index"
import cors from 'cors'
import "./src/db";
 


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors())
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(router);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});