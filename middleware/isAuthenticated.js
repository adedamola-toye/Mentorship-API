import jwt from "jsonwebtoken";

function isAuthenticated(req, res, next){
    console.log('isAuthenticated called');
   const token = req.header('Authorization')?.replace('Bearer ', '')
   console.log('Token:', token);

   if(!token){
    return res.status(403).json({message: "Unauthorized, no token"})
   }

   jwt.verify(token,process.env.JWT_SECRET_KEY, (err, decoded)=>{
    if(err){
        return res.status(401).json({message: "Unauthorized, invalid token"})
    }
    console.log('Decoded JWT:', decoded);
    req.user = decoded;
    next();
   } )
}

export default isAuthenticated