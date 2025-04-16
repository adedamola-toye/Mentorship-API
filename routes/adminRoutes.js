import express from "express";
const router = express.Router();

router.patch(
    "/users/:userId/promote",
    isAuthenticated,
    isAdmin,
    authController.promoteUser
  );

export default router;