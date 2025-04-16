import sessions from "../models/session";

function createSession(req, res){
    const {mentorId} = req.body;
    const menteeId = req.user.id;

    const newSession = {
        id: sessions.length+1,
        menteeId,
        mentorId,
        status: 'pending'
    };
    sessions.push(newSession);
    res.status(201).json(newSession)
}


function acceptSession(req, res){
    const mentorId= req.user.id;
    const sessionId = req.params.id
    const session = sessions.find((session)=>session.id === sessionId)
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
    const sessionId = req.params.id
    const session = sessions.find((session)=>session.id === sessionId)
    if(!session){
        return res.status(404).json({message: 'Session not found'})
    }

    //Make sure the mentor owns the session
    if(session.mentorId !== req.user.id){
        return res.status(403).json({message: 'Not authorized to accept the session'})
    }

    session.status = 'rejected';
    return res.json(session)
}

