const express = require('express');
const router = express.Router();
const booking = require('../controllers/booking');
const {verifyToken , checkGuestUser} = require('../middleware/auth');

router.post('/booked',verifyToken,checkGuestUser, booking.booked);



module.exports = router;