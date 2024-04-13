const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  try{
     
    if(!token){
    return res.status(403).send("Access Denied");
    
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;

    next();
  }catch(err){
    res.status(500).json({error: err.message});
  }
}


// Middleware to check if the user is a guest
exports.checkGuestUser = (req, res, next) => {
  // Check if the user is a guest
  if (req.user && req.user.isGuest) {
      // return res.status(403).send('Access forbidden for guest users');
      return res.redirect('/login');
  }

  next();
};