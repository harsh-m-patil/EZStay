const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  try{
     
    if(!token){
    return res.status(403).send("Access Denied");
    
    }

    const business = jwt.verify(token, process.env.JWT_SECRET);

    req.business = business;

    next();
  }catch(err){
    res.status(500).json({error: err.message});
  }
}