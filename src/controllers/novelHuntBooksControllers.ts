
import { Request , Response, NextFunction } from "express";
import { BookInfo, Books } from "protocols/novelHuntProtocols";
import novelHuntBooksServices from "services/novelHuntBooksServices";


async function allBooks (req: Request, res: Response, next: NextFunction) {

    try {

      const allmyBooks = req.query as Books;
      const result = await novelHuntBooksServices.allBook(allmyBooks);

      return res.status(200).send(result);

    } catch (error) {
      
      next(error);


    }

  }


  async function createBook(req: Request, res: Response, next: NextFunction) {

    try {
      const boooks = req.body as BookInfo;
      const id: Number = res.locals.user.id;
  
      await novelHuntBooksServices.createBook(boooks, id);
      return res.sendStatus(201);

    } catch (error) {
     
      next(error);

    }

  }



  async function list (req: Request, res: Response, next: NextFunction) {

    try {

      const { bookId, writerId } = req.params;
      const userID: Number = res.locals.user.id;
      await novelHuntBooksServices.fetchList({ userID, bookId: Number(bookId), writerId: Number(writerId) });
  
      return res.sendStatus(201);

    } catch (error) {


      next(error);

    }

  }

  export default { list , allBooks, createBook }