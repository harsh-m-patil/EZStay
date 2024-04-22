const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Business = require('../models/business');
const Booking = require('../models/booking');
const User = require('../models/user');

exports.index = async (req, res) => {
	res.render('business');
};

exports.newBusinesses = async (req, res) => {
	res.render('newBussiness');
};

exports.createBusiness = async (req, res) => {
  const { fullname, username, email, phone, dob, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .send("Username already exists. Please choose a different username.");
    }

    // encrypting the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      fullname,
      username,
      email,
      phone,
      dob,
      password: passwordHash,
      role: "business"
    });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error signing up: ${err.message}`);
  }
};

exports.getBusinesses = async (req, res) => {
	res.render('businesslogin');
};

exports.accessBusiness = async (req, res) => {
	try {
		const { username, password } = req.body;
		const business = await User.findOne({ username });

		if (!business) return res.status(401).send('Invalid username');

		const isMatch = await bcrypt.compare(password, business.password);

		if (!isMatch) return res.status(401).send('Invalid password');

		delete business.password;

		const businessPayload = {
			id: business._id,
			hotelname: business.fullname,
			username: business.username,
			email: business.email,
			phone: business.phone,
			dob: business.dob,
			role : business.role
		};

		const token = jwt.sign(businessPayload, process.env.JWT_SECRET, {
			expiresIn: '1h'
		});

		res.cookie('token', token, {
			httpOnly: true
		});

		return res.redirect('/business/dashboard');
	} catch (err) {
		console.error(err);

		res.status(500).send(`Error loging in: ${err.message}`);
	}
};

exports.businessDashboard = async (req, res) => {
	console.log(req.business);
	try {
		const business = await Business.findOne({
			username: req.business.username
		}).populate('hotel');
        const bookings = await Booking.find({hotel: business.hotel }).populate('user').populate('hotel');
		console.log(business);
		return res.render('dashboard', { business: business , bookings:bookings});
	} catch (error) {
		console.error('Error accessing dashboard');
	}
};
// Logout
exports.logout = async (req, res) => {
	res.clearCookie('token').redirect('/business/login');
};
