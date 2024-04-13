const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const {verifyToken , checkGuestUser} = require('../middleware/auth');



// signup handler
router.get('/signup', user.newUsers);
router.post('/signup', user.createUser);


  // login handler
router.get('/login', user.getUsers);
router.post('/login', user.accessUser);


//index
router.get('/index', verifyToken, user.index);

// //root
// router.get('/', verifyToken,user.root);


// Logout
router.get('/logout', user.logout);

//presonalinfo
router.get('/personalinfo',verifyToken,checkGuestUser, user.personalinfo);
router.get('/security',verifyToken, user.security);

// update
router.post('/updateName',verifyToken, user.updateName);
router.post('/updateEmail', verifyToken, user.updateEmail);
router.post('/updatePhone', verifyToken, user.updatePhone);


router.post('/updatepassword', verifyToken, user.updatepassword);
router.post('/deleteuser', verifyToken, user.deleteuser);


module.exports = router;