const User = require("../models/user");
const Booking = require("../models/booking");
const Business = require('../models/business');
const Hotel = require("../models/hotel.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.newsuperuser = async (req, res) => {
    res.render('superusersignup');
}

exports.createsuperuser = async (req, res) => {
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
      role: "superuser"
      });
      await user.save();
      res.redirect("/superuserlogin");
    } catch (err) {
      console.error(err);
      res.status(500).send(`Error signing up: ${err.message}`);
    }
}

exports.getsuperuser = async (req, res) => {
    res.render('superuserlogin');
}

exports.accesssuperuser = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user) return res.status(401).send("Invalid username");
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) return res.status(401).send("Invalid password");
  
      delete user.password;

    //   if (user.role !== "superuser") {
    //     return res.status(403).send("Access Denied");
    // }
  
      const userPayload = {
        id: user._id,
        username: user.username,
        role: user.role,
        
      };
  
      const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
  
      res.cookie("token", token, {
        httpOnly: true,
      });
  
      return res.redirect("/superadmin");
    } catch (err) {
      console.error(err);
  
      res.status(500).send(`Error logging in: ${err.message}`);
    }
  };

exports.superadmin = async (req, res) => {
   res.render('superadmin');
};



exports.superuserBookings = async (req, res) => {
    try {
        // Fetch all bookings from the database
        const bookings = await Booking.find().populate('user').populate('hotel');
        console.log(bookings);
        res.render('superuserBookings', { bookings: bookings });
     } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).send("Internal Server Error");
     }
}

exports.superuserUsers = async (req, res) => {
    try {
        
        const users = await User.find();
        res.render('superuserUsers', {users: users });
     } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
     }
}


exports.superuserHotels = async (req, res) => {
    try {
        
        const hotels = await Hotel.find();
        res.render('superuserHotels', {hotels: hotels });
     } catch (error) {
        console.error("Error fetching hotels:", error);
        res.status(500).send("Internal Server Error");
     }
}

exports.superuserBusinesses = async (req, res) => {
    try {
        
        const businesses = await Business.find();
        res.render('superuserBusinesses', {businesses: businesses });
     } catch (error) {
        console.error("Error fetching businesses:", error);
        res.status(500).send("Internal Server Error");
     }
}


exports.superuserlogout = async (req, res) => {
  
    res.clearCookie('token').redirect('/superuserlogin');
}