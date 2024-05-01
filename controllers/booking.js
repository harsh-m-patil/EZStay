const Booking = require('../models/booking');
const jwt = require('jsonwebtoken');
const Hotel = require('../models/hotel.model');
exports.booked = async (req, res) => {
	try {
		// Get the token from the request cookies
		const token = req.cookies.token;

		// Verify the token
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		const userId = decodedToken.id;

		const clickedHotel = req.session.clickedHotel;
		const dates = req.session.dates;
		const totalPrice = req.session.totalPrice;
		const noOfRooms = req.session.noOfRooms;

		const hotelId = clickedHotel._id;

		// Create a new booking document
		const booking = new Booking({
			user: userId,
			hotel: hotelId,
			checkIn: dates.checkIn,
			checkOut: dates.checkOut,
			totalPrice: totalPrice,
			status: 'booked'
		});

		const updatedHotel = await Hotel.findByIdAndUpdate(
			hotelId,
			{ $inc: { revenue: totalPrice } }, // Increment totalRevenue by totalPrice
			{ new: true } // Return the updated hotel document
		);

		if (!updatedHotel) {
			// Handle error if hotel not found
		}
		// Save the booking to the database
		await booking.save();

		// res.status(201).send("Booking successful");
		res.redirect('/bookingconfirm');
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal server error');
	}
};

exports.bookingconfirmed = async (req, res) => {
	try {
		const token = req.cookies.token;

		// Verify the token
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		const userId = decodedToken.id;

		const bookings = await Booking.find({ user: userId }).populate('hotel').populate('user');

		res.render('bookingconfirm', { bookings: bookings });
	} catch (error) {
		console.error('Error fetching bookings:', error);
		res.status(500).send('Internal server error');
	}
};

exports.cancelbooking = async (req, res) => {
	try {
		// Get the booking ID from the request parameters
		const bookingId = req.body.bookingId;

		// Find the booking in the database by ID and update its status to "canceled"
		const updatedBooking = await Booking.findByIdAndUpdate(
			bookingId,
			{ status: 'cancelled' }
			// { new: true }
		);

		if (!updatedBooking) {
			// If booking is not found, return an error response
			return res.status(404).json({ message: 'Booking not found' });
		}

		const updatedHotel = await Hotel.findByIdAndUpdate(
			updatedBooking.hotel,
			{ $inc: { revenue: -updatedBooking.totalPrice } }, // Increment totalRevenue by totalPrice
			{ new: true } // Return the updated hotel document
		);

		if (!updatedHotel) {
			// Handle error if hotel not found
		}
		const token = req.cookies.token;

		// Verify the token
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		const userId = decodedToken.id;

		const bookings = await Booking.find({ user: userId }).populate('hotel').populate('user');

		res.render('userdashboard', { bookings: bookings });
	} catch (error) {
		// If an error occurs, return an error response
		console.error('Error canceling booking:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
