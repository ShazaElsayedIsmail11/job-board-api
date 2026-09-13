import { Request, Response } from "express";

import {
  getMyProfileService,
  saveSeekerProfileService,
  saveEmployerProfileService, saveCVService
} from "../services/profileService.js";
import AppError from "../utils/AppError.js";

export async function saveSeekerProfile(
  req: Request,
  res: Response
) {
  const profile = await saveSeekerProfileService(
    req.user!.id,
    req.body
  );

  return res.status(200).json({
    message: "Seeker profile saved successfully",
    data: profile,
  });
}

export async function saveEmployerProfile(
  req: Request,
  res: Response
) {
  const profile = await saveEmployerProfileService(
    req.user!.id,
    req.body
  );

  return res.status(200).json({
    message: "Employer profile saved successfully",
    data: profile,
  });
}

export async function getMyProfile(
  req: Request,
  res: Response
) {
  const user = await getMyProfileService(
    req.user!.id
  );

  return res.status(200).json({
    data: user,
  });
}

export async function uploadSeekerCV(
  req: Request,
  res: Response
) {
  if (!req.file) {
    throw new AppError("CV file is required", 400);
  }

  const profile = await saveCVService(
    req.user!.id,
    req.file.path
  );

  return res.status(200).json({
    message: "CV uploaded successfully",
    data: profile,
  });
}