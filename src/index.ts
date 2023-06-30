
import express from "express";
import theErrosList from "middlewares/novelHuntErrorsMiddleware";
import "express-async-errors";
import appRouter from "app";
import dotenv from "dotenv";


dotenv.config();


const app = express();
app.use(express.json());

app.use(appRouter);
app.use(theErrosList);

const PORT = process.env.PORT || 3350;
app.listen(PORT, () => console.log(`Hi, Its Me!!!`));