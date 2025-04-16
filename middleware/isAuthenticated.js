function isAuthenticated(req, res, next){
   const token = req.header('Authorization')?.replace('Bearer ', '')
   if(!token){
    return res.status(401).json({message: "Unauthorized, no token"})
   }

   jwt.verify(token,process.env.JWT_SECRET_KEY, (err, decoded)=>{
    if(err){
        return res.status(401).json({message: "Unauthorized, invalid token"})
    }
    req.user = decoded;
    next();
   } )
}

export default isAuthenticated