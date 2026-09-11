import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";

type SeekerProfileData = {
  bio?: string;
  skills: string[];
};

type EmployerProfileData = {
  companyName: string;
  companyWebsite?: string;
  companyDescription?: string;
};

export async function saveSeekerProfileService(
  userId: number,
  data: SeekerProfileData
) {
  return prisma.seekerProfile.upsert({
    where: {
      userId,
    },
    update: data,
    create: {
      userId,
      ...data,
    },
  });
}

export async function saveEmployerProfileService(
  userId: number,
  data: EmployerProfileData
) {
  return prisma.employerProfile.upsert({
    where: {
      userId,
    },
    update: data,
    create: {
      userId,
      ...data,
    },
  });
}

export async function getMyProfileService(userId: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      seekerProfile: true,
      employerProfile: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
}