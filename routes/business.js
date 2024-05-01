const express = require('express');
const router = express.Router();
const business = require('../controllers/business');
const { verifyToken, checkBusinessUser } = require('../middleware/auth');

router.get('/', business.index);

router.get('/signup', business.newBusinesses);
router.post('/signup', business.createBusiness);

// login handler
router.get('/login', business.getBusinesses);
router.post('/login', business.accessBusiness);

router.get('/dashboard', verifyToken, checkBusinessUser, business.businessDashboard);
router.post('/createhotel', verifyToken, checkBusinessUser, business.createHotel);
router.post('/updateHotel', verifyToken, checkBusinessUser, business.updateHotel);
// Logout
router.get('/update', business.update);
router.get('/delete', business.deleteOwner);
router.get('/logout', business.logout);

router.post('/deleteOwner', business.deleteOwnerConfirmed);
module.exports = router;
