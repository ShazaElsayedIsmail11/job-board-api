import Joi from "joi";

export const updateApplicationStatusSchema = Joi.object({
  status: Joi.string()
    .valid("ACCEPTED", "REJECTED")
    .required(),
});