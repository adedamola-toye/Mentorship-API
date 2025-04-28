/* import express from "express";
const router = express.Router();
import authController from "../controllers/authController";

router.post("/signup", authController.signup);

router.post("/signin", authController.signin);

export default router;

 */

import express from "express";
const router = express.Router();
import authController from "../controllers/authController.js";

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication and management
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create a user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - address
 *               - bio
 *               - occupation
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Ade
 *               lastName:
 *                 type: string
 *                 example: Toye
 *               email:
 *                 type: string
 *                 example: toye.adedamola@gmail.com
 *               password:
 *                 type: string
 *                 example: toye123
 *               address:
 *                 type: string
 *                 example: 123 Main Street
 *               bio:
 *                 type: string
 *                 example: A passionate developer.
 *               occupation:
 *                 type: string
 *                 example: Software Engineer
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

router.post("/signup", authController.signup);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
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
 *                 example: toye.adedamola@gmail.com
 *               password:
 *                 type: string
 *                 example: abc123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 */

router.post("/signin", authController.signin);

export default router;
