const express = require('express');
const router = express.Router();
const superuser = require('../controllers/superuser');
const {verifyToken , checkSuperuser} = require('../middleware/auth');

router.get('/superusersignup', superuser.newsuperuser);
router.post('/superusersignup', superuser.createsuperuser);

router.get('/superuserlogin', superuser.getsuperuser);
router.post('/superuserlogin', superuser.accesssuperuser);

router.get('/superadmin',verifyToken,checkSuperuser, superuser.superadmin);

router.get('/superuserBookings', superuser.superuserBookings);

router.get('/superuserUsers', superuser.superuserUsers);

router.get('/superuserHotels', superuser.superuserHotels);

router.get('/superuserBusinesses', superuser.superuserBusinesses);

router.get('/superuserlogout', superuser.superuserlogout);


router.post('/updateUserRole', superuser.updateUserRole);

router.post('/deletingUser', superuser.Userdeleted);




module.exports = router;