import Joi from "joi";
const registerSchema=Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(10).max(40),
    role: Joi.string().valid("SEEKER", "EMPLOYER").required()
})
export const loginSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})
export default registerSchema;