
import joi from "joi";
import joiDate from "@joi/date";



const theDay = joi.extend(joiDate);

export const WriterSchema = theDay.object({

    name: theDay.string().required(),
    email: theDay.string().email().required(),
    password: theDay.string().min(6).required(),
    birth: theDay.date().format("YYYY-MM-DD").required(),
    bio: theDay.array().items(theDay.string()).min(1).required(),

  });

  