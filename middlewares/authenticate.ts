import {  NextFunction } from "express";
import { Response } from "express";
import type { AuthRequest } from "../types/AuthRequest.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Authentication required", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    )as {
  id: number;
  role: "SEEKER" | "EMPLOYER";
};

req.user = {
  id: decoded.id,
  role: decoded.role,
};


    next();
  } catch {
    next(new AppError("Invalid or expired token", 401));
  }
}

export default authenticate;