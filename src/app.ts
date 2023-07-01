
import { Router } from "express";
import registerRouter from "routers/novelHuntRegisterRouter.js";
import writersRouter from "routers/novelHuntWritersRouter.js";
import booksRouter from "routers/novelHuntBooksRouter.js";

const appRouter = Router();

appRouter.use("/mainpage", registerRouter);
appRouter.use("/writers", writersRouter);
appRouter.use("/books", booksRouter);

export default appRouter;