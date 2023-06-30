
import joi from "joi";
import joiDate from "@joi/date";


const theDay = joi.extend(joiDate);


export const RegisterSchema = theDay.object({

    email: theDay.string().email().required(),
    password: theDay.string().min(10).required(),

  });


export const LoginSchema = theDay.object({

    email: theDay.string().email().required(),
    password: theDay.string().min(10).required(),

  });

