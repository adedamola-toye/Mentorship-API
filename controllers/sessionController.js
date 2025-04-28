import {saveSessionsToFile , generateSessionId, loadSessionsFromFile} from "../data/sessions.js";
import { loadUsersFromFile } from "../data/users.js";
//import { users } from "../data/users.js";

function findSessionById(id, sessions) {
  return sessions.find((session) => session.id === id);
}

function createSession(req, res) {
  const { mentorId, questions } = req.body;
  const menteeId = req.user.userId;
  const menteeEmail = req.user.email;

  if (mentorId == null || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: "Mentor ID and questions are required and questions must be a non-empty array." });
  }
  const users = loadUsersFromFile();
  // Check if the mentor exists and has the role 'mentor'
  const mentor = users.find(
    (user) => user.id === mentorId && user.role === "mentor"
  );
  if (!mentor) {
    return res.status(400).json({
      message:
        "Invalid mentorId. No such mentor exists or user is not a mentor.",
    });
  }

  const id = generateSessionId();
  const newSession = {
    id,
    menteeId,
    mentorId,
    questions,
    menteeEmail,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const sessions = loadSessionsFromFile();
  sessions.push(newSession);
  saveSessionsToFile(sessions);
  
  res.status(201).json({ message: "Session created successfully", newSession });
}

function acceptSession(req, res) {
  const userId = req.user.userId
  const sessionId = parseInt(req.params.id);
  const sessions = loadSessionsFromFile();
  const session = findSessionById(sessionId, sessions);

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  //Make sure the mentor owns the session
  if (session.mentorId !== userId) {
    return res
      .status(403)
      .json({ message: "Not authorized to accept the session" });
  }

  session.status = "accepted";
  
  saveSessionsToFile(sessions);

  return res.status(200).json({ message: "Session accepted successfully", session });
}

function rejectSession(req, res) {
  const userId = req.user.userId;
  const sessionId = parseInt(req.params.id);
  const sessions = loadSessionsFromFile()
  const session = findSessionById(sessionId, sessions);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  //Make sure the mentor owns the session
  if (session.mentorId !== userId) {
    return res
      .status(403)
      .json({ message: "Not authorized to reject the session" });
  }

  session.status = "rejected";

  saveSessionsToFile(sessions);
  return res.json({ message: "Session rejected", session });
}

function reviewSession(req, res) {
  const userId = req.user.userId;
  const sessionId = parseInt(req.params.id);
  const { rating, comment } = req.body;

  if(!rating || !comment){
    return res.status(400).json({message:"Rating and comment required to review"})
  }
  
  const sessions = loadSessionsFromFile()
  const session = findSessionById(sessionId, sessions);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  if (session.status !== "accepted") {
    return res
      .status(400)
      .json({
        message: "Session must be accepted before a mentee can review it",
      });
  }

  if (session.menteeId !== userId) {
    return res
      .status(403)
      .json({ message: "Not authorized to review the session" });
  }
  if (session.review) {
    return res.status(400).json({ message: "Session already has a review" });
  }
  session.review = {
    rating,
    comment,
  };
  saveSessionsToFile(sessions);
  res.status(200).json({ message: "Review added successfully", session });
}

function getAllSessions(req, res) {
    const userId = req.user.userId;
    const users = loadUsersFromFile();
    const sessions = loadSessionsFromFile();

    const user = users.find((user) => user.id === Number(userId));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const userRole = user.role;
    let userSessions = [];
    
    if (userRole === 'user') {
      // Get all sessions created by the mentee
      userSessions = sessions.filter((session) => session.menteeId === userId);
    } else if (userRole === 'mentor') {
      // Get all sessions where the mentor is involved
      userSessions = sessions.filter((session) => session.mentorId === userId);
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }
    
    return res.status(200).json({
      status: 200,
      data: userSessions,
    });
  }
  

export default { createSession, acceptSession, rejectSession, reviewSession, getAllSessions };
