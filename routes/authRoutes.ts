import { Router } from "express";
import validate from "../middlewares/validate.js";
import registerSchema, {loginSchema} from "../validators/authValidator.js";
import { login, register, getMe } from "../controllers/authController.js";
import asyncHandler from "../utils/asyncHandler.js";
import authenticate from "../middlewares/authenticate.js";

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [SEEKER, EMPLOYER]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 */
const router = Router();
router.post(
  "/register",
  validate(registerSchema),asyncHandler(register)
);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid email or password
 */
router.post("/login",validate(loginSchema),asyncHandler(login))


/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     summary: Get current user
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 *       401:
 *         description: Invalid or missing token
 */
router.get("/me",authenticate, asyncHandler(getMe))
export default router;