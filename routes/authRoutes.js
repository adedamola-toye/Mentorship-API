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
 *     description: Create user account
 *     tags: [Authentication]
 *     parameters:
 *       - name: firstName
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *       - name: lastName
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *       - name: email
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *       - name: password
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: User created successfully
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
router.post("/signup", authController.signup);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     description: Login a user
 *     tags: [Authentication]
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         schema:
 *           type: string
 *       - name: password
 *         in: body
 *         required: true
 *         schema:
 *           type: string
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
 */
router.post("/signin", authController.signin);

export default router;
