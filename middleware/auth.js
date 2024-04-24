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


exports.checkSuperuser = (req, res, next) => {
 
 if (req.user && req.user.role === 'superuser') {
  
  next();
} else {
  // If not a superuser, deny access
  res.status(403).send('Access denied. Only superusers can access this page.');
}
};

exports.checkBusinessUser = (req, res, next) => {
	if(req.user && req.user.role === 'business') {
		next();
	} else {
		res.status(403).send('Access Denied. Only business user can access this page.')
	}
}
