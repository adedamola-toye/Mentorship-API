/* import express from "express";
const router = express.Router();
import promoteToMentor from "../controllers/adminController.js";
import isAdmin from "../middleware/isAdmin.js"
import isAuthenticated from "../middleware/isAuthenticated.js";

router.patch(
    "/users/:userId/promoteToMentor",
    isAuthenticated,
    isAdmin,
    promoteToMentor
  );

export default router; */

import express from "express";
const router = express.Router();
import promoteToMentor from "../controllers/adminController.js";
import isAdmin from "../middleware/isAdmin.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Admin-related actions and management
 */

/**
 * @swagger
 * /users/{userId}/promoteToMentor:
 *   patch:
 *     description: Admin promotes a user to a mentor role
 *     tags: [Admin]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: token
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully promoted to mentor
 *       403:
 *         description: Forbidden - Unauthorized role or insufficient permissions
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.patch(
  "/users/:userId/promoteToMentor",
  isAuthenticated,
  isAdmin,
  promoteToMentor
);

export default router;
