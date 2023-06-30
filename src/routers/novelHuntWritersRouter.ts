
import { Router } from "express";
import registerMiddleware from "middlewares/novelHuntMiddleware";
import novelHuntWriterControllers from "controllers/novelHuntWriterControllers";



const writersRouter = Router();

writersRouter.get("/list",registerMiddleware,novelHuntWriterControllers.Wlist);
  
writersRouter.get("/search",registerMiddleware,novelHuntWriterControllers.allSearchs);
  
writersRouter.post("/search/:bookId/page/", registerMiddleware,  novelHuntWriterControllers.search);

export default writersRouter;
  