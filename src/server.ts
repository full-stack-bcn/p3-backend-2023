import express from "express";
import { ErrorRequestHandler } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import partnerRouter from "./partner.js";
import promotionRouter from "./promotion.js"
import tournamentRouter from "./tournament.js"
import { defaultErrorHandler } from "./utils.js";

//to use the file .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
//to log request http
app.use(morgan("dev"));

app.use("/partner", partnerRouter);
app.use("/promotion", promotionRouter);
app.use("/tournament", tournamentRouter);

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`Tournament API listening on: ${process.env.SERVER_PORT}`);
})