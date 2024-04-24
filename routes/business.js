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

router.get('/dashboard', verifyToken,checkBusinessUser, business.businessDashboard);
router.post('/createhotel',checkBusinessUser, business.createHotel)
router.post('/updateHotel',checkBusinessUser, business.updateHotel)
// Logout
router.get('/logout', business.logout);

module.exports = router;
