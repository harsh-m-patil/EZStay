const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Business = require("../models/business");

exports.newBusinesses = async (req, res) => {
  res.sendFile("newBussiness.html", { root: global.staticpath });
};

exports.createBusiness = async (req, res) => {
  const { hotelname, username, email, password } = req.body;

  try {
    // Check if the username already exists
    const existingBusiness = await Business.findOne({ username });
    if (existingBusiness) {
      return res
        .status(400)
        .send("Username already exists. Please choose a different username.");
    }

    // encrypting the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user
    const newBusiness = new Business({
      hotelname,
      username,
      email,
      password: passwordHash,
    });

    await newBusiness.save();
    res.redirect("/business/login");
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error signing up: ${err.message}`);
  }
};

exports.getBusinesses = async (req, res) => {
  res.sendFile("businesslogin.html", { root: global.staticpath });
};

exports.accessBusiness = async (req, res) => {
  try {
    const { username, password } = req.body;
    const business = await Business.findOne({ username });

    if (!business) return res.status(401).send("Invalid username");

    const isMatch = await bcrypt.compare(password, business.password);

    if (!isMatch) return res.status(401).send("Invalid password");

    delete business.password;

    const businessPayload = {
      id: business._id,
      hotelname: business.fullname,
      username: business.username,
      email: business.email,
    };

    const token = jwt.sign(businessPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.redirect("/business/dashboard");
  } catch (err) {
    console.error(err);

    res.status(500).send(`Error loging in: ${err.message}`);
  }
};

exports.businessDashboard = async (req, res) => {
  res.render("dashboard", { business: req.business });
};
// Logout
exports.logout = async (req, res) => {
  res.clearCookie("token").redirect("/business/login");
};
