import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
type registerData={
     name: string;
  email: string;
  password: string;
  role: "SEEKER" | "EMPLOYER";
}

export async function registeUser(data:registerData){
    const existingUser= await prisma.user.findUnique({
        where:{email: data.email}
    })


  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  const hashedPassword=await bcrypt.hash(data.password,10)
  const newUser=await prisma.user.create({
   data:{
     name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role
   }
  })
  const { password, ...safeUser } = newUser;

return safeUser;
}
export async function loginUser(email: string, password: string){
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }
  const isPasswordValid = await bcrypt.compare(
  password,
  user.password
);
if (!isPasswordValid) {
  throw new AppError("Invalid email or password", 401);
}
const token=jwt.sign({
    id: user.id,
    role: user.role
}, process.env.JWT_SECRET!,{expiresIn:"1d"})

const { password: userPassword, ...safeUser } = user;

return {
  user: safeUser,
  token,
};
}
export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
}