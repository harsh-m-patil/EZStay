const User = require("../models/user");
const Booking = require("../models/booking");
const Business = require("../models/business");
const Hotel = require("../models/hotel.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.newsuperuser = async (req, res) => {
  res.render("superusersignup");
};

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
      role: "superuser",
    });
    await user.save();
    res.redirect("/superuserlogin");
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error signing up: ${err.message}`);
  }
};

exports.getsuperuser = async (req, res) => {
  res.render("superuserlogin");
};

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
  res.render("superadmin");
};

exports.superuserBookings = async (req, res) => {
  try {
    // Fetch all bookings from the database
    const bookings = await Booking.find().populate("user").populate("hotel");
   
    res.render("superuserBookings", { bookings: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.superuserUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render("superuserUsers", { users: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.superuserHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.render("superuserHotels", { hotels: hotels });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.superuserBusinesses = async (req, res) => {
    try {
        
        const businesses = await Business.find();
        res.render('superuserBusinesses', {businesses: businesses });
     } catch (error) {
        console.error("Error fetching businesses:", error);
        res.status(500).send("Internal Server Error");
     }
}

exports.updateUserRole = async (req, res) => {
  const { userId, newRole } = req.body;

  try {

   

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update the user's role
    user.role = newRole;

    await user.save();
    
    // Fetch all users after updating the role
    const users = await User.find();

    // Render the superuserUsers page with the updated user data
    res.render('superuserUsers', { users: users });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.Userdeleted = async (req, res) => {
  try {

    const userId = req.body.userId

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
  }

   await Booking.deleteMany({ user: userId });
    

    await User.findByIdAndDelete(userId);

     // Fetch all users after updating the role
     const users = await User.find();

     res.render('superuserUsers', { users: users });


  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).send("Internal Server Error");
  }
}


exports.superuserlogout = async (req, res) => {
  res.clearCookie("token").redirect("/superuserlogin");
};

exports.searchUsers = async (req, res) => {
  const { search } = req.query;

  try {
    const searchedUsers = await User.find({
      $or: [
        { username: { $regex: search, $options: "i" } },
        { fullname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        {
          role: ["user", "superuser", "bussiness"].includes(search)
            ? search
            : { $regex: search, $options: "i" },
        },
      ],
    });

    if (searchedUsers.length === 0) {
      return res.json({ message: "No user" });
    }

    return res.render("searchedUser", { searchedUsers: searchedUsers });
  } catch (error) {
    console.error("Error during user search:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

exports.searchedSuperuserBooking = async (req, res) => {
  const { search } = req.query;

  try {
    console.log(`Search query: ${search}`);

    // Fetch all bookings and populate user and hotel details
    const allBookings = await Booking.find({}).populate("user").populate("hotel");

    // Filter bookings to find those with matching fullname, email, or hotelName
    const filteredBookings = allBookings.filter(booking => {
      return (
        booking.user.fullname.toLowerCase().includes(search.toLowerCase()) ||
        booking.user.email.toLowerCase().includes(search.toLowerCase()) ||
        booking.hotel.hotelName.toLowerCase().includes(search.toLowerCase()) ||
        booking.status.toLowerCase().includes(search.toLowerCase()) 
        // booking.checkIn.toISOString().includes(search) || 
        // booking.checkOut.toISOString().includes(search)
      );
    });

    console.log("Filtered Bookings:", filteredBookings);

    if (filteredBookings.length === 0) {
      return res.status(404).json({ message: "No booking found." });
    }

    // Render the searched bookings
    return res.render("searchedSuperuserBooking", { searchedBooking: filteredBookings });
  } catch (error) {
    console.error("Error during booking search:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


exports.searchedSuperuserBussiness = async (req, res) => {
  const { search } = req.query;

  try {
    const searchedBussiness = await Business.find({
      $or: [
        { hotelname: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    });

    if (searchedBussiness.length === 0) {
      return res.json({ message: "No Bussiness" });
    }

    return res.render("searchedSuperuserBussiness", {
      searchedBussiness: searchedBussiness,
    });
  } catch (error) {
    console.error("Error during user search:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

exports.searchedSuperuserHotel = async (req, res) => {
  const { search } = req.query;
  const parsedRating = parseFloat(search);
  const isNumericSearch = !isNaN(parsedRating);

  try {
    const searchQuery = {
      $or: [
        { hotelName: { $regex: search, $options: "i" } },
        { hotelAddress: { $regex: search, $options: "i" } },
      ],
    };

    if (isNumericSearch) {
      searchQuery.$or.push({ rating: parsedRating });
    }

    const searchedHotels = await Hotel.find(searchQuery);

    if (searchedHotels.length === 0) {
      return res.json({ message: "No Hotel" });
    }

    // console.log(searchedHotels);

    return res.render("searchedSuperuserHotel", {
      searchedHotels: searchedHotels,
    });
  } catch (error) {
    console.error("Error during user search:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
