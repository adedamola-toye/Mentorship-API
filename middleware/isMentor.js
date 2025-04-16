function isMentor(req, res, next){
    if(req.user.role !== 'mentor'){
        return res.status(403).json({message: 'Only mentors can respond to session requests'});
    }
    next();
}

export default isMentor