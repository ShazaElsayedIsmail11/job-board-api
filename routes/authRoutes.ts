import { Router } from "express";
import validate from "../middlewares/validate.js";
import registerSchema, {loginSchema} from "../validators/authValidator.js";
import { login, register, getMe } from "../controllers/authController.js";
import asyncHandler from "../utils/asyncHandler.js";
import authenticate from "../middlewares/authenticate.js";
const router = Router();
router.post(
  "/register",
  validate(registerSchema),asyncHandler(register)
);
router.post("/login",validate(loginSchema),asyncHandler(login))

router.get("/me",authenticate, asyncHandler(getMe))
export default router;