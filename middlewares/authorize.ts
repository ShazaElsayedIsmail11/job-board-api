import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";

function authorize(role: "SEEKER" | "EMPLOYER") {
  return function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (req.user?.role !== role) {
      return next(new AppError("Forbidden", 403));
    }

    next();
  };
}

export default authorize;