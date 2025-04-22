/* import express from "express";
const router = express.Router();
import mentorController from '../controllers/mentorController'
import isAuthenticated from "../middleware/isAuthenticated";

router.get('/mentors', isAuthenticated, mentorController.getAllMentors)
router.get('/mentors/:id', isAuthenticated, mentorController.getSpecificMentor)

export default router; */
import express from "express";
const router = express.Router();
import mentorController from '../controllers/mentorController.js';
import isAuthenticated from "../middleware/isAuthenticated.js";

/**
 * @swagger
 * tags:
 *   - name: Mentors
 *     description: Mentor management
 */

/**
 * @swagger
 * /mentors:
 *   get:
 *     description: Get all mentors
 *     tags: [Mentors]
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all mentors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   mentorId:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   bio:
 *                     type: string
 */
router.get('/mentors', isAuthenticated, mentorController.getAllMentors);

/**
 * @swagger
 * /mentors/{id}:
 *   get:
 *     description: Get specific mentor details
 *     tags: [Mentors]
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
 *         description: Specific mentor details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mentorId:
 *                   type: integer
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 bio:
 *                   type: string
 */
router.get('/mentors/:id', isAuthenticated, mentorController.getSpecificMentor);

export default router;
