import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";
import jobSchema, {updateJobSchema} from "../validators/jobValidator.js";
import validate from "../middlewares/validate.js";
import { createJob, getAllJobs, getJobById, updateJob, deleteJob } from "../controllers/jobController.js";
import asyncHandler from "../utils/asyncHandler.js";
import { applyToJob } from "../controllers/applicationController.js";
import { getJobApplications } from "../controllers/applicationController.js";
const router = Router();

/**
 * @openapi
 * /api/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: employerId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jobs returned successfully
 *
 *   post:
 *     summary: Create a new job
 *     tags:
 *       - Jobs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Employers only
 */
router.post("/",authenticate, authorize("EMPLOYER"),validate(jobSchema), asyncHandler(createJob));

router.get("/", asyncHandler(getAllJobs));
/**
 * @openapi
 * /api/jobs/{id}:
 *   get:
 *     summary: Get job by id
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job returned successfully
 *       400:
 *         description: Invalid job id
 *       404:
 *         description: Job not found
 *
 *   patch:
 *     summary: Update a job
 *     tags:
 *       - Jobs
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
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       400:
 *         description: Invalid data or job id
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Not allowed to update this job
 *       404:
 *         description: Job not found
 *
 *   delete:
 *     summary: Delete a job
 *     tags:
 *       - Jobs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       400:
 *         description: Invalid job id
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Not allowed to delete this job
 *       404:
 *         description: Job not found
 */
router.get("/:id", getJobById);

router.patch("/:id",authenticate,authorize("EMPLOYER"),validate(updateJobSchema), asyncHandler(updateJob))

router.delete(
  "/:id",
  authenticate,
  authorize("EMPLOYER"),
  asyncHandler(deleteJob)
);

/**
 * @openapi
 * /api/jobs/{id}/apply:
 *   post:
 *     summary: Apply to a job
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
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Job seekers only
 *       404:
 *         description: Job not found
 *       409:
 *         description: Already applied to this job
 *
 * /api/jobs/{id}/applications:
 *   get:
 *     summary: Get applications for a job
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
 *     responses:
 *       200:
 *         description: Applications returned successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Not allowed to view these applications
 *       404:
 *         description: Job not found
 */
router.post(
  "/:id/apply",
  authenticate,
  authorize("SEEKER"),
  asyncHandler(applyToJob)
);
router.get(
  "/:id/applications",
  authenticate,
  authorize("EMPLOYER"),
  asyncHandler(getJobApplications)
);
export default router;