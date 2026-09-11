import Joi from "joi";

const jobSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(20).max(2000).required(),
});
export const updateJobSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(20).max(2000),
}).min(1);
export default jobSchema;