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
 *     summary: Admin promotes a user to mentor role
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to promote
 *     responses:
 *       200:
 *         description: User promoted successfully
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.patch(
  "/users/:id/promoteToMentor",
  isAuthenticated,
  isAdmin,
  promoteToMentor
);

export default router;
