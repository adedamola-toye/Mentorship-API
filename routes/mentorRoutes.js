import express from "express";
const router = express.Router();
import mentorController from '../controllers/mentorController'

router.get('/mentors', mentorController.getAllMentors)

export default router;