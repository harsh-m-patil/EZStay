const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const {verifyToken} = require('../middleware/user');



// signup handler
router.get('/signup', user.newUsers);
router.post('/signup', user.createUser);


  // login handler
router.get('/login', user.getUsers);
router.post('/login', user.accessUser);


//index
router.get('/index', verifyToken, user.index);

//root
router.get('/', verifyToken,user.root);


// Logout
router.get('/logout', user.logout);

//presonalinfo
router.get('/personalinfo',verifyToken, user.personalinfo);

// update
router.post('/updateName',verifyToken, user.updateName);
router.post('/updateUsername', user.updateUsername);
router.post('/updateEmail', user.updateEmail);
router.post('/updatePhone', user.updatePhone);

//search
// router.post('/search', searchHotel)


module.exports = router;