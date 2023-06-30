
import { Router } from "express";
import registerMiddleware from "middlewares/novelHuntMiddleware.js";
import validate from "middlewares/novelHuntValidate.js";
import novelHuntBooksControllers from "controllers/novelHuntBooksControllers.js";
import { BookSchema } from "schemas/novelHuntBookSchema.js";

const booksRouter = Router();

booksRouter.post("/",registerMiddleware,validate(BookSchema),novelHuntBooksControllers.createBook);

booksRouter.get("/allbooks", registerMiddleware, novelHuntBooksControllers.allBooks);

booksRouter.post("/:bookId/list/:authorId",registerMiddleware,novelHuntBooksControllers.list);

export default booksRouter;