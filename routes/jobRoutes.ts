import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";
import jobSchema, {updateJobSchema} from "../validators/jobValidator.js";
import validate from "../middlewares/validate.js";
import { createJob, getAllJobs, getJobById, updateJob, deleteJob } from "../controllers/jobController.js";
import asyncHandler from "../utils/asyncHandler.js";
const router = Router();

router.post("/",authenticate, authorize("EMPLOYER"),validate(jobSchema), asyncHandler(createJob));

router.get("/", asyncHandler(getAllJobs));

router.get("/:id", getJobById);

router.patch("/:id",authenticate,authorize("EMPLOYER"),validate(updateJobSchema), asyncHandler(updateJob))

router.delete(
  "/:id",
  authenticate,
  authorize("EMPLOYER"),
  asyncHandler(deleteJob)
);
export default router;