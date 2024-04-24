const express = require('express');
const router = express.Router();
const superuser = require('../controllers/superuser');
const {verifyToken , checkSuperuser} = require('../middleware/auth');

router.get('/superusersignup',verifyToken,checkSuperuser, superuser.newsuperuser);
router.post('/superusersignup', superuser.createsuperuser);

router.get('/superuserlogin', superuser.getsuperuser);
router.post('/superuserlogin', superuser.accesssuperuser);

router.get('/superadmin',verifyToken,checkSuperuser, superuser.superadmin);

router.get('/superuserBookings',verifyToken,checkSuperuser, superuser.superuserBookings);

router.get('/superuserUsers',verifyToken,checkSuperuser, superuser.superuserUsers);

router.get('/superuserHotels',verifyToken,checkSuperuser, superuser.superuserHotels);

router.get('/superuserBusinesses',verifyToken,checkSuperuser, superuser.superuserBusinesses);

router.get('/superuserlogout',verifyToken,checkSuperuser, superuser.superuserlogout);


router.post('/updateUserRole',verifyToken,checkSuperuser, superuser.updateUserRole);

router.post('/deletingUser',verifyToken,checkSuperuser, superuser.Userdeleted);

router.post('/cancelbookingfromsuperuser',verifyToken,checkSuperuser,superuser.cancelbooking);

router.post('/deletingBookings',verifyToken,checkSuperuser,superuser.deletingBookings);



router.get('/searchUsers',verifyToken,checkSuperuser, superuser.searchUsers);

router.get('/searchedSuperuserBooking',verifyToken,checkSuperuser, superuser.searchedSuperuserBooking);

router.get('/searchedSuperuserBussiness',verifyToken,checkSuperuser, superuser.searchedSuperuserBussiness);

router.get('/searchedSuperuserHotel',verifyToken,checkSuperuser, superuser.searchedSuperuserHotel);

module.exports = router;
