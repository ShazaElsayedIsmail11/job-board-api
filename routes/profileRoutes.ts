import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadCV from "../middlewares/uploadCV.js";
import {
  seekerProfileSchema,
  employerProfileSchema,
} from "../validators/profileValidator.js";

import {
  getMyProfile,
  saveSeekerProfile,
  saveEmployerProfile, uploadSeekerCV
} from "../controllers/profileController.js";

const router = Router();
/**
 * @openapi
 * /api/profiles/me:
 *   get:
 *     summary: Get current user's profile
 *     tags:
 *       - Profiles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile returned successfully
 *       401:
 *         description: Authentication required
 *
 * /api/profiles/seeker/me:
 *   put:
 *     summary: Create or update seeker profile
 *     tags:
 *       - Profiles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - skills
 *             properties:
 *               bio:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Seeker profile saved successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Job seekers only
 *
 * /api/profiles/employer/me:
 *   put:
 *     summary: Create or update employer profile
 *     tags:
 *       - Profiles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *             properties:
 *               companyName:
 *                 type: string
 *               companyWebsite:
 *                 type: string
 *                 format: uri
 *               companyDescription:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employer profile saved successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Employers only
 *
 * /api/profiles/seeker/cv:
 *   patch:
 *     summary: Upload seeker CV
 *     tags:
 *       - Profiles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - cv
 *             properties:
 *               cv:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: CV uploaded successfully
 *       400:
 *         description: CV is required or invalid file type
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Job seekers only
 *       404:
 *         description: Seeker profile not found
 */
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

router.patch(
  "/seeker/cv",
  authenticate,
  authorize("SEEKER"),
  uploadCV.single("cv"),
  asyncHandler(uploadSeekerCV)
);
export default router;