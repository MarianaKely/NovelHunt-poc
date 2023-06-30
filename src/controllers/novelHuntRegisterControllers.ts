
import { Request , Response , NextFunction } from "express";
import novelHuntErrors from "errors/novelHuntErrors";
import novelHuntRegisterServices from "services/novelHuntRegisterServices";
import { WInfo , WriterInfo} from "protocols/novelHuntProtocols";


async function register (req: Request, res: Response, next: NextFunction) {

    const save = req.body as WInfo;

    try {
      await novelHuntRegisterServices.register(save);

      return res.sendStatus(201);

    } catch (error) {

      next(error);

    }

  }


  async function login(req: Request, res: Response, next: NextFunction) {

    const enter = req.body as WriterInfo;

    try {

      const token = await novelHuntRegisterServices.login(enter);

      return res.status(200).send(token);

    } catch (error) {
      
      next(error);

    }

  }


  async function findMember (req: Request, res: Response, next: NextFunction) {

    const id = Number(req.params.id);

    try {

      const mainUser = await novelHuntRegisterServices.findMember(id);

      if (mainUser) return res.status(200).send(mainUser);
      throw novelHuntErrors.notFoundError("Sorry,  do not found registers");
      
    } catch (error) {

      next(error);

    }

  }

  export default { findMember , login, register}
  