const express = require('express');
const router = express.Router();
const business = require('../controllers/business');
const { verifyToken } = require('../middleware/business');

router.get('/', business.index);

router.get('/signup', business.newBusinesses);
router.post('/signup', business.createBusiness);

// login handler
router.get('/login', business.getBusinesses);
router.post('/login', business.accessBusiness);

router.get('/dashboard', verifyToken, business.businessDashboard);
// Logout
router.get('/logout', business.logout);

module.exports = router;
