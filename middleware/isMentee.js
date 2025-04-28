function isMentee(req, res, next){
    if(req.user.role !== 'user'){
        return res.status(403).json({message: 'Only mentees (regular users) can request sessions'});
    }
    next();
}
export default isMentee;