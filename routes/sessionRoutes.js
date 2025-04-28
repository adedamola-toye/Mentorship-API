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
 *                 type: array
 *                 items:
 *                      type: string
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
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Session accepted
 */
router.patch('/sessions/:id/accept', isAuthenticated, isMentor, sessionController.acceptSession);

/**
 * @swagger
 * /sessions/{id}/reject:
 *   patch:
 *     description: Mentor can reject a session
 *     tags: [Sessions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Session rejected
 */
router.patch('/sessions/:id/reject', isAuthenticated,  isMentor, sessionController.rejectSession);

/**
 * @swagger
 * /sessions/{id}/review:
 *   patch:
 *     description: Review a mentor after a session
 *     tags: [Sessions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           description: The ID of the session to review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: Rating for the session (e.g., 1 to 5)
 *               comment:
 *                 type: string
 *                 description: Comment about the session
 *             required:
 *               - rating
 *               - comment
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Session reviewed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 session:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     status:
 *                       type: string
 *                     review:
 *                       type: object
 *                       properties:
 *                         rating:
 *                           type: integer
 *                         comment:
 *                           type: string
 *       400:
 *         description: Rating or comment missing, or session not accepted
 *       403:
 *         description: Not authorized to review this session
 *       404:
 *         description: Session not found
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
