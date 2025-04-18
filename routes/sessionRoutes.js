import express from "express";
const router = express.Router();
import sessionController from '../controllers/sessionController'
import isMentee from "../middleware/isMentee";
import isMentor from "../middleware/isMentor";

router.post('/sessions', isMentee, sessionController.createSession)
router.patch('/sessions/:id/accept', isMentor, sessionController.acceptSession)
router.patch('/sessions/:id/reject', isMentor, sessionController.rejectSession)
router.patch('/sessions/:id/review', isMentee, sessionController.reviewSession)

export default router;