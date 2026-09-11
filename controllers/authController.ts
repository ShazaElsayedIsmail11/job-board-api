import { Request, Response } from "express";
import { registeUser,loginUser, getUserById } from "../services/authService.js";

export async function register(req: Request,res: Response){
const user= await registeUser(req.body);
   return res.status(201).json({
    message: "User registered successfully",
    data: user,
  });
}

export async function login(req: Request, res: Response){
const {email ,password}=req.body;
const result=await loginUser(email,password);
return res.status(200).json({
    message: "Login successful",
    data: result,
  });
}
export async function getMe(req: Request, res: Response) {
    const user= await getUserById(req.user!.id)
  return res.status(200).json({
    data: user
  });
}
