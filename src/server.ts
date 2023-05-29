import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import partnerRouter from "./routers/partner.js";
import promotionRouter from "./routers/promotion.js"
import tournamentRouter from "./routers/tournament.js"
import rankingtRouter from "./routers/ranking.js"
import positionRouter from "./routers/position.js"

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
app.use("/ranking", rankingtRouter);
app.use("/position", positionRouter);

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`Tournament API listening on: ${process.env.SERVER_PORT}`);
})