
import Joi from "joi";

export const BookSchema = Joi.object({

  title: Joi.string().required(),
  genre: Joi.string().required(),
  publication: Joi.date().required(),
  publisher: Joi.string().required(),

});

