import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import novelHuntErrors from "errors/novelHuntErrors";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;


export default function registerMiddleware(

  req: Request,
  res: Response,
  next: NextFunction

   ) {

     const token = req.headers.authorization?.replace("Bearer ", "");

      try {

        const user = jwt.verify(token, JWT_SECRET);

         if (user) {

          res.locals.user = user;
          next();

         } else {

          throw novelHuntErrors.loginError();

         }

          } catch (error) {

            throw novelHuntErrors.loginError();

       }

}