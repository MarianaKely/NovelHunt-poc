
import { Response , Request , NextFunction } from "express";


export default function theErrosList(

    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction

  ) {


    if (err.name === "LoginError") {return res.status(401).send({message: err.message, });}


    if (err.name === "ErrorInformations") {return res.status(401).send({message: err.message,});}


    if (err.name === "DateError") { return res.status(422).send({message: err.message,});}

  
    if (err.name === "NotFoundError") {return res.status(404).send({ message: err.message,});}


    if (err.name === "InternalError" || err.name === "invalidEmail") {return res.status(409).send({ message: err.message });}


    return res.status(500).send({ error: "InternalServerError", message: "Internal Server Error",});

  }