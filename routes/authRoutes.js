import express from "express";
const router = express.Router();
import authController from "../controllers/authController";

router.post("/signup", authController.signup);

router.post("/signin", authController.signin);

router.patch(
  "/users/:userId/promote",
  isAuthenticated,
  isAdmin,
  authController.promoteUser
);
