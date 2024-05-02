const express = require('express');
const router = express.Router();
const business = require('../controllers/business');
const { verifyToken, checkBusinessUser, upload, isAuthenticated } = require('../middleware/auth');

router.get('/', business.index);

router.get('/signup',isAuthenticated, business.newBusinesses);
router.post('/signup', business.createBusiness);

// login handler
router.get('/login',isAuthenticated, business.getBusinesses);
router.post('/login', business.accessBusiness);

router.get('/dashboard', verifyToken, checkBusinessUser, business.businessDashboard);
router.post('/createhotel', verifyToken, checkBusinessUser, business.createHotel);
router.post('/updateHotel', verifyToken, checkBusinessUser, business.updateHotel);
router.post('/uploadimage', upload, verifyToken, checkBusinessUser, business.uploadimage);
// Logout
router.get('/update', business.update);
router.get('/delete', business.deleteOwner);
router.get('/logout', business.logout);

router.post('/deleteOwner', business.deleteOwnerConfirmed);
module.exports = router;
