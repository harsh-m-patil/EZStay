const express = require('express');
const router = express.Router();
const guest = require('../controllers/guest');
const {verifyToken, checkGuestUser} = require('../middleware/auth');


//root
router.get('/', guest.root);

// router.get('/index', guest.index);

router.get('/userdashboard',verifyToken,checkGuestUser, guest.userdashboard);

module.exports = router;