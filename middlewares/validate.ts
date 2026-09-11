import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import AppError from "../utils/AppError.js";
 
function validate(schema:ObjectSchema){
    return function(req: Request,res: Response, next: NextFunction){
        const {error,value}=schema.validate(req.body,{abortEarly:false})

        if(error){ const message = error.details
        .map((detail) => detail.message)
        .join(", ");

      return next(new AppError(message, 400));}

      req.body=value
      next()
    }
}
export default validate;
