import { sessions, saveSessionsToFile , generateSessionId} from "../data/sessions.js";
import { users } from "../data/users.js";
function findSessionById(id) {
  return sessions.find((session) => session.id === id);
}

function createSession(req, res) {
  const { mentorId, questions } = req.body;
  const menteeId = req.user.id;

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
    sessionId: id,
    menteeId,
    mentorId,
    questions,
    menteeEmail: mentor.email,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  sessions.push(newSession);
  saveSessionsToFile();
  res.status(201).json({ message: "Session created successfully", newSession });
}

function acceptSession(req, res) {
  const mentorId = req.user.id;
  const sessionId = parseInt(req.params.id);
  const session = findSessionById(sessionId);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  //Make sure the mentor owns the session
  if (session.mentorId !== req.user.id) {
    return res
      .status(403)
      .json({ message: "Not authorized to accept the session" });
  }

  session.status = "accepted";
  saveSessionsToFile();
  return res.json({ message: "Session accepted successfully", session });
}

function rejectSession(req, res) {
  const mentorId = req.user.id;
  const sessionId = parseInt(req.params.id);
  const session = findSessionById(sessionId);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  //Make sure the mentor owns the session
  if (session.mentorId !== req.user.id) {
    return res
      .status(403)
      .json({ message: "Not authorized to reject the session" });
  }

  session.status = "rejected";
  saveSessionsToFile();
  return res.json({ message: "Session rejected", session });
}

function reviewSession(req, res) {
  const menteeId = req.user.id;
  const { rating, comment } = req.body;
  const sessionId = parseInt(req.params.id);
  const session = findSessionById(sessionId);
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

  if (session.menteeId !== req.user.id) {
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
  saveSessionsToFile();
  res.status(200).json({ message: "Review added successfully", session });
}

function getAllSessions(req, res) {
    const userId = req.user.id;
    const user = users.find((user) => user.id === userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const userRole = user.role;
    let userSessions = [];
    
    if (userRole === 'mentee') {
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
