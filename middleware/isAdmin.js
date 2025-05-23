function isAdmin(req, res, next){
    if(req.user.role !== 'admin'){
        return res.status(403).json({message: "Forbidden, admin access required"})
    }
    next()
}

export default isAdmin;