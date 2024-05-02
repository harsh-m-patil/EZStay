const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Booking = require('../models/booking');
const User = require('../models/user');
const Hotel = require('../models/hotel.model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
			return res.status(400).send('Username already exists. Please choose a different username.');
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
			role: 'business'
		});
		await user.save();
		res.redirect('login');
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
		const business = await User.findOne({ username: username });

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
			role: business.role
		};

		const token = jwt.sign(businessPayload, process.env.JWT_SECRET, {
			expiresIn: '1h'
		});

		res.cookie('token', token, {
			httpOnly: true
		});

		return res.redirect('dashboard');
	} catch (err) {
		console.error(err);

		res.status(500).send(`Error loging in: ${err.message}`);
	}
};

exports.businessDashboard = async (req, res) => {
	try {
		const business = await User.findOne({
			username: req.user.username
		});

		const hotel = await Hotel.findOne({
			owner: business.id
		});

		const bookings = await Booking.find({ hotel: hotel }).populate('user').populate('hotel');

		const uniqueUserIds = [...new Set(bookings.map((booking) => booking.user))];

		return res.render('dashboard', {
			business: business,
			bookings: bookings,
			hotel: hotel,
			uniqueUserIds: uniqueUserIds
		});
	} catch (error) {
		console.error('Error accessing dashboard');
	}
};
// Logout
exports.logout = async (req, res) => {
	res.clearCookie('token').redirect('login');
};

// const storage = multer.diskStorage({
//   destination:"./views/myuploads",  
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname +"-"+Date.now()+path.extname(file.originalname));
//   }
// })

// const upload = multer({ storage: storage }).single('imageLinks');

exports.createHotel = async (req, res) => {
  // console.log(req.id);
  // storage
 
  const { username, hotelName, hotelAddress, hotelPrice, rooms } = req.body;
  try {
    // Check if the username already exists
    const existingHotel = await Hotel.findOne({ hotelName });
    if (existingHotel) {
      return res.status(400).send('Hotelname already exists. Please choose a different username.');
    }

   

        // Extract filename from uploaded file
      // const imageFilename = req.file.filename;

        const ownerdb = await User.findOne({ username });
    const owner = ownerdb.id;

    // const filenames = req.files.map((file) => file.filename);
    // Create a new hotel
    const hotel = new Hotel({
      hotelName,
      hotelAddress,
      hotelPrice,
      
      rooms,
      owner
    });
    // console.log(hotel);
    req.session.hotel = hotel;

    await hotel.save();
    res.redirect('/business/dashboard');

  

    
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error signing up: ${err.message}`);
  }
};



exports.updateHotel = async (req, res) => {
  const { username, hotelName, hotelAddress, hotelPrice, rooms } = req.body;

  try {
    const owner = await User.findOne({ username });
    const hotel = await Hotel.findOne({ owner: owner._id });

    if (!hotel) {
      return res.status(404).send('Hotel not found');
    }

    // const filenames = req.files.map((file) => file.filename);

    // Update hotel fields
    hotel.hotelName = hotelName;
    hotel.hotelAddress = hotelAddress;
    hotel.hotelPrice = hotelPrice;
    hotel.rooms = rooms;

    if (req.file) {
      // Update imageLinks if a new file was uploaded
      hotel.imageLinks = req.file.filename;
    }
    
      //  hotel = new Hotel({
      //   imageLinks:req.file.filename, 
      // });

    await hotel.save();
    res.redirect('/business/dashboard');
  } catch (error) {
    console.error(`Error updating hotel ${error}`);
    res.status(500).send(`Error updating hotel: ${error.message}`);
  }
};

exports.uploadimage = async (req, res) => {
   
  try {
    
    const token = req.cookies.token;

    const businessuser = jwt.verify(token, process.env.JWT_SECRET);

    const userid = businessuser.id;

    const hotel = await Hotel.findOne({ owner: userid });
    

    const filenames = req.files.map((file) => file.filename);
    
    
      
      hotel.imageLinks = filenames;
      
      
    await hotel.save();
    res.redirect('/business/dashboard');

  

    
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error uploading image: ${err.message}`);
  }
}



exports.update = (req, res) => {
	res.redirect('/personalinfo');
};

exports.deleteOwner = (req, res) => {
	res.render('deleteOwner');
};

exports.deleteOwnerConfirmed = async (req, res) => {
	const { username, password } = req.body;
	try {
		const business = await User.findOne({ username: username });

		if (!business) return res.status(401).send('Invalid username');

		const isMatch = await bcrypt.compare(password, business.password);

		if (!isMatch) return res.status(401).send('Invalid password');

		delete business.password;

		const hotel = await Hotel.findOne({owner:business._id})
		await Hotel.deleteOne({ owner: business._id });
		await User.findByIdAndDelete(business._id);
		await Booking.deleteMany({hotel:hotel});

		// res.status(200).send('User deleted successfully');
		res.clearCookie('token').redirect('login');
	} catch (error) {
		console.error(`Error deleting business ${error}`);
	}
};
