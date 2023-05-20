import express from "express";
import { ErrorRequestHandler } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import partnerRouter from "./partner.js";
import { defaultErrorHandler } from "./utils.js";

//for use the file .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
//to log request http
app.use(morgan("dev"));

app.use("/partner", partnerRouter);
