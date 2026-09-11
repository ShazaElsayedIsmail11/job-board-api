import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
  seekerProfileSchema,
  employerProfileSchema,
} from "../validators/profileValidator.js";

import {
  getMyProfile,
  saveSeekerProfile,
  saveEmployerProfile,
} from "../controllers/profileController.js";

const router = Router();

router.get(
  "/me",
  authenticate,
  asyncHandler(getMyProfile)
);

router.put(
  "/seeker/me",
  authenticate,
  authorize("SEEKER"),
  validate(seekerProfileSchema),
  asyncHandler(saveSeekerProfile)
);

router.put(
  "/employer/me",
  authenticate,
  authorize("EMPLOYER"),
  validate(employerProfileSchema),
  asyncHandler(saveEmployerProfile)
);

export default router;