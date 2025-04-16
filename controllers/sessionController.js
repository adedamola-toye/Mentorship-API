import sessions from "../models/session";

function findSessionById(id){
    return sessions.find((session)=>session.id === sessionId)
}

function createSession(req, res){
    const {mentorId} = req.body;
    const menteeId = req.user.id;

    const newSession = {
        id: sessions.length+1,
        menteeId,
        mentorId,
        status: 'pending',
    };
    sessions.push(newSession);
    res.status(201).json(newSession)
}


function acceptSession(req, res){
    const mentorId= req.user.id;
    const sessionId = parseInt(req.params.id)
    const session = findSessionById(sessionId)
    if(!session){
        return res.status(404).json({message: 'Session not found'})
    }

    //Make sure the mentor owns the session
    if(session.mentorId !== req.user.id){
        return res.status(403).json({message: 'Not authorized to accept the session'})
    }

    session.status = 'accepted';
    return res.json(session)
}

function rejectSession(req, res){
    const mentorId= req.user.id;
    const sessionId = parseInt(req.params.id)
    const session = findSessionById(sessionId)
    if(!session){
        return res.status(404).json({message: 'Session not found'})
    }

    //Make sure the mentor owns the session
    if(session.mentorId !== req.user.id){
        return res.status(403).json({message: 'Not authorized to reject the session'})
    }

    session.status = 'rejected';
    return res.json(session)
}

function reviewSession(req, res){
    const menteeId = req.user.id;
    const {rating, comment} = req.body;
    const sessionId = parseInt(req.params.id)
    const session = findSessionById(sessionId)
    if(!session){
        return res.status(404).json({message: 'Session not found'})
    }
    if(session.status !== 'accepted'){
        return res.status(400).json({message:"Session must be accepted before a mentee can review it"})
    }
    
    if(session.menteeId !== req.user.id){
        return res.status(403).json({message: 'Not authorized to review the session'})
    }
    if(session.review){
        return res.status(400).json({message: "Session already has a review"})
    }
    session.review = {
        rating,
        comment
    }
    res.status(200).json({ message: 'Review added successfully', session });

}

export default {createSession, acceptSession, rejectSession, reviewSession}