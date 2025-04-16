function isMentee(req, res, next){
    if(req.user.role !== 'mentee'){
        return res.status(403).json({message: 'Only mentees can request sessions'});
    }
    next();
}
export default isMentee;