import Joi from "joi";

export const seekerProfileSchema = Joi.object({
  bio: Joi.string().max(1000).optional(),
  skills: Joi.array()
    .items(Joi.string().min(1))
    .min(1)
    .required(),
});

export const employerProfileSchema = Joi.object({
  companyName: Joi.string().min(2).max(100).required(),
  companyWebsite: Joi.string().uri().optional(),
  companyDescription: Joi.string().max(2000).optional(),
});