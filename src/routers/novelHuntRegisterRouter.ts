
import { Router } from "express";
import registerMiddleware from "middlewares/novelHuntMiddleware";
import { RegisterSchema } from "schemas/novelHuntRegisterSchema";
import { WriterSchema } from "schemas/novelHuntWriterSchema";
import novelHuntRegisterControllers from "controllers/novelHuntRegisterControllers";
import validate from "middlewares/novelHuntValidate";


const registerRouter = Router();

registerRouter.post( "/register", validate(WriterSchema), novelHuntRegisterControllers.register);
  
registerRouter.post("/login",validate(RegisterSchema),novelHuntRegisterControllers.login);

registerRouter.get( "/:id", registerMiddleware, novelHuntRegisterControllers.findMember);

export default registerRouter;
