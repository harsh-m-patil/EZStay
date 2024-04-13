const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// signup handler
exports.newUsers = async (req, res) => {
  res.sendFile("signup.html", { root: global.staticpath });
};

exports.createUser = async (req, res) => {
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
    });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error signing up: ${err.message}`);
  }
};

// login handler
exports.getUsers = async (req, res) => {
  res.sendFile("login.html", { root: global.staticpath });
};

exports.accessUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(401).send("Invalid username");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).send("Invalid password");

    delete user.password;

    const userPayload = {
      id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
    };

    const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // req.session.user = user;
    // res.setHeader('Authorization', `Bearer ${token}`);

    // res.status(200).json({token, user});

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.redirect("/index");
  } catch (err) {
    console.error(err);

    res.status(500).send(`Error logging in: ${err.message}`);
  }
};

//index
exports.index = async (req, res) => {
  // if (!req.session.user) {
  //   res.redirect('/login');
  // } else {

  //   res.render('index', { user: req.session.user });

  // }
  res.render("index", { user: req.user });
};

// root
exports.root = async (req, res) => {
  // if (!req.session.user) {
  //   res.redirect('/login');
  // } else {

  //   res.render('index', { user: req.session.user });

  // }
  // Assuming root page requires authentication
  res.render("index", { user: req.user });
};

//personalinfo
exports.personalinfo = async (req, res) => {
  // if (!req.session.user) {
  //   res.redirect('/login');
  // } else {

  //   res.render('personalinfo', { user: req.session.user });

  // }
  // Assuming personalinfo page requires authentication
  res.render("personalinfo", { user: req.user });
};

// Updates
exports.updateName = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullname } = req.body;
    await User.findByIdAndUpdate(userId, { fullname });

    // Fetch updated user information
    const updatedUser = await User.findById(userId);

    // Update the name in the user payload
    req.user.fullname = fullname;

    // Create a new payload without the 'exp' property
    const { exp, ...userPayload } = req.user;

    // Generate a new token with updated user payload
    const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the new token in the cookie
    res.cookie("token", token, {
      httpOnly: true,
    });

    // Render personalinfo.ejs with updated information
    res.render("personalinfo", { user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error updating name: ${err.message}`);
  }
};

exports.updateUsername = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .send("Username already exists. Please choose a different username.");
    }

    await User.findByIdAndUpdate(userId, { username });

    // Update name in session
    req.user.username = username;

    // Fetch updated user information
    const updatedUser = await User.findById(userId);

    // Render personalinfo.ejs with updated information
    res.render("personalinfo", { user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error updating name: ${err.message}`);
  }
};

exports.updateEmail = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email } = req.body;
    await User.findByIdAndUpdate(userId, { email });

    // Update name in session
    req.user.email = email;

    // Fetch updated user information
    const updatedUser = await User.findById(userId);

    // Render personalinfo.ejs with updated information
    res.render("personalinfo", { user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error updating name: ${err.message}`);
  }
};

exports.updatePhone = async (req, res) => {
  try {
    const userId = req.user.id;
    const { phone } = req.body;
    await User.findByIdAndUpdate(userId, { phone });

    // Update name in session
    req.user.phone = phone;

    // Fetch updated user information
    const updatedUser = await User.findById(userId);

    // Render personalinfo.ejs with updated information
    res.render("personalinfo", { user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error updating name: ${err.message}`);
  }
};

// Logout
exports.logout = async (req, res) => {
  // req.session.destroy(err => {
  //         if (err) {
  //           console.error(err);
  //           res.status(500).send('Error logging out');
  //         } else {
  //           res.redirect('/login');
  //         }
  //       });
  res.clearCookie("token").redirect("/login");
};


