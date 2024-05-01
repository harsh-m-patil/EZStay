const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

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
  // console.log(req.user.role);
	if(req.user && req.user.role === "business") {
		next();
	} else {
		res.status(403).send('Access Denied. Only business user can access this page.')
	}
}

// const storage = multer.diskStorage({
//   destination:"./views/myuploads",  
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname +"-"+Date.now()+path.extname(file.originalname));
//   }
// })

// exports.upload = multer({ storage: storage }).array("imageLinks", 5);

const storage = multer.diskStorage({
  destination: "./views/myuploads",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).array("imageLinks", 5);
 

exports.upload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred (e.g., file size exceeded)
      return res.status(400).send('File upload error: ' + err.message);
    } else if (err) {
      // An unexpected error occurred
      console.error('File upload error:', err);
      return res.status(500).send('Internal server error');
    }

    // No errors, proceed to the next middleware or route handler
    next();
  });
};


exports.isAuthenticated = (req, res, next) => {
  // Check for the presence of the token in cookies
  const token = req.cookies.token;
  if (!token) {
    // If token is not present, continue to the next middleware
    return next();
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      // If token verification fails, continue to the next middleware
      return next();
    }

    // If user is authenticated, store user information in req.user
    req.user = decodedToken;
    
    // Redirect authenticated user to another route (e.g., dashboard)
    res.redirect('/index'); // Change '/index' to your desired authenticated route
  });
};