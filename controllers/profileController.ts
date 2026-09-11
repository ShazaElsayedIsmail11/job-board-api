import { Request, Response } from "express";

import {
  getMyProfileService,
  saveSeekerProfileService,
  saveEmployerProfileService,
} from "../services/profileService.js";

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