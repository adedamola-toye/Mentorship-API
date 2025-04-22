/* import express from "express";
const router = express.Router();
import sessionController from '../controllers/sessionController'
import isMentee from "../middleware/isMentee";
import isMentor from "../middleware/isMentor";

router.post('/sessions', isMentee, sessionController.createSession)
router.patch('/sessions/:id/accept', isMentor, sessionController.acceptSession)
router.patch('/sessions/:id/reject', isMentor, sessionController.rejectSession)
router.patch('/sessions/:id/review', isMentee, sessionController.reviewSession)

export default router; */

import express from "express";
const router = express.Router();
import sessionController from '../controllers/sessionController.js';
import isMentee from "../middleware/isMentee.js";
import isMentor from "../middleware/isMentor.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

/**
 * @swagger
 * tags:
 *   - name: Sessions
 *     description: Mentorship session management
 */

/**
 * @swagger
 * /sessions:
 *   post:
 *     description: Create a mentorship session request
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentorId:
 *                 type: integer
 *               questions:
 *                 type: string
 *     responses:
 *       200:
 *         description: Session created successfully
 */
router.post('/sessions', isAuthenticated, isMentee, sessionController.createSession);

/**
 * @swagger
 * /sessions/{id}/accept:
 *   patch:
 *     description: Mentor can accept a session
 *     tags: [Sessions]
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Session accepted
 */
router.patch('/sessions/:id/accept', isMentor, sessionController.acceptSession);

/**
 * @swagger
 * /sessions/{id}/reject:
 *   patch:
 *     description: Mentor can reject a session
 *     tags: [Sessions]
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Session rejected
 */
router.patch('/sessions/:id/reject', isAuthenticated, isMentor, sessionController.rejectSession);

/**
 * @swagger
 * /sessions/{id}/review:
 *   patch:
 *     description: Review a mentor after a session
 *     tags: [Sessions]
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Session reviewed
 */
router.patch('/sessions/:id/review', isAuthenticated, isMentee, sessionController.reviewSession);

/**
 * @swagger
 * /sessions:
 *   get:
 *     summary: Get all mentorship session requests
 *     description: Retrieve a list of mentorship sessions based on the user's role (mentee or mentor).
 *     operationId: getSessions
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []  # Assuming you're using Bearer authentication (JWT)
 *     responses:
 *       200:
 *         description: A list of mentorship sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       sessionId:
 *                         type: integer
 *                         example: 1
 *                       mentorId:
 *                         type: integer
 *                         example: 101
 *                       menteeId:
 *                         type: integer
 *                         example: 201
 *                       questions:
 *                         type: string
 *                         example: "What is the most challenging part of backend development?"
 *                       menteeEmail:
 *                         type: string
 *                         example: "mentee@example.com"
 *                       status:
 *                         type: string
 *                         example: "pending"
 *       403:
 *         description: Forbidden - Unauthorized role
 *       500:
 *         description: Server error
 */
router.get("/sessions", isAuthenticated, sessionController.getAllSessions);

export default router;
