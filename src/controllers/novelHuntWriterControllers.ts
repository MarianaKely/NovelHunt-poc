
import { Request , Response, NextFunction } from "express";
import novelHuntWritersServices from "services/novelHuntWritersServices";
import { Books } from "protocols/novelHuntProtocols";



async function Wlist (req: Request, res: Response, next: NextFunction) {

    try {

      const allList = req.query as Books;
      const list = await novelHuntWritersServices.writerList(allList);
      return res.status(200).send(list);

    } catch (error) {

      next(error);

    }

  }



  async function allSearchs (req: Request, res: Response, next: NextFunction) {

    try {

      const mainWriter: Number = res.locals.user.id;
      const result = await novelHuntWritersServices.allSearchs(mainWriter);
      return res.status(200).send(result);

    } catch (error) {

      next(error);

    }

  }



  async function search (

    req: Request,
    res: Response,
    next: NextFunction

  ) {

    try {

      const { bookId } = req.params;
      const writerId: Number = res.locals.user.id;

      await novelHuntWritersServices.search({

        writerId,
        bookId: Number(bookId),

      });

      return res.sendStatus(201);

    } catch (error) {
  
      next(error);

    }

  }



  export default { search, allSearchs, Wlist}
  
  