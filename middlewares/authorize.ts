import { NextFunction } from "express";
import AppError from "../utils/AppError.js";
import { Response } from "express";
import type { AuthRequest } from "../types/AuthRequest.js";
function authorize(role: "SEEKER" | "EMPLOYER") {
  return function (
    req: AuthRequest,
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