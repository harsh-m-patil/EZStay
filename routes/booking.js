const express = require('express');
const router = express.Router();
const booking = require('../controllers/booking');
const { verifyToken, checkGuestUser } = require('../middleware/auth');

router.post('/booked', verifyToken, checkGuestUser, booking.booked);

router.get('/bookingconfirm', booking.bookingconfirmed);

router.post('/cancelbooking', booking.cancelbooking);

router.post('/cancelBookingByHotel', booking.cancelBookingByHotel);

module.exports = router;