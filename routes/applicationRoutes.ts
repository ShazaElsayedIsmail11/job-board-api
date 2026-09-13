import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getMyApplications, updateApplicationStatus } from "../controllers/applicationController.js";
import validate from "../middlewares/validate.js";
import { updateApplicationStatusSchema } from "../validators/applicationValidators.js";
const router = Router();
/**
 * @openapi
 * /api/applications/me:
 *   get:
 *     summary: Get current seeker's applications
 *     tags:
 *       - Applications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Applications returned successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Job seekers only
 *
 * /api/applications/{id}/status:
 *   patch:
 *     summary: Update application status
 *     tags:
 *       - Applications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [ACCEPTED, REJECTED]
 *     responses:
 *       200:
 *         description: Application status updated successfully
 *       400:
 *         description: Invalid application id or status
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Not allowed to update this application
 *       404:
 *         description: Application not found
 */
router.get(
  "/me",
  authenticate,
  authorize("SEEKER"),
  asyncHandler(getMyApplications)
);
router.patch(
  "/:id/status",
  authenticate,
  authorize("EMPLOYER"),
  validate(updateApplicationStatusSchema),
  asyncHandler(updateApplicationStatus))
export default router;