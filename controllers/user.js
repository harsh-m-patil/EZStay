const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


// signup handler
exports.newUsers = async (req, res) => {
    res.sendFile('signup.html', { root: global.staticpath });
};

exports.createUser = async (req, res) => {
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
      const user = new User({ fullname, username, email, phone, dob, password: passwordHash });
      await user.save();
      res.redirect('/login');
  } catch (err) {
      console.error(err);
      res.status(500).send(`Error signing up: ${err.message}`);
  }
};


// login handler
exports.getUsers = async (req, res) => {
    res.sendFile('login.html', { root: global.staticpath });
};

exports.accessUser = async (req, res) => {
    try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user) return res.status(401).send('Invalid username');
             
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) return res.status(401).send('Invalid password');
            
            
            delete user.password;

            const userPayload = {
              id: user._id,
              fullname: user.fullname,
              username: user.username,
              email: user.email,
              phone: user.phone,
              dob: user.dob,
              
              
          };

            const token = jwt.sign( userPayload , process.env.JWT_SECRET, { expiresIn: "1h"});


            res.cookie("token", token, {
              httpOnly: true,
            });

           return res.redirect('/index');
             
            
          } catch (err) {
            console.error(err);
            
            res.status(500).send(`Error loging in: ${err.message}`);
          }
};

//index
exports.index = async (req, res) => {
  
  res.render('index', { user: req.user });
};

// root
// exports.root = async (req, res) => {

//     res.render('index', { user: req.user });

// };

//personalinfo
exports.personalinfo = async (req, res) => {
  
  res.render('personalinfo', { user: req.user });
}

//security
exports.security = async (req, res) => {
  
  res.render('security', { user: req.user });
}

// fuction for update

const updating = function(req, res){

       // Create a new payload without the 'exp' property
       const { exp, ...userPayload } = req.user;

       // Generate a new token with updated user payload
       const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: "1h" });

      // Set the new token in the cookie
      res.cookie("token", token, {
          httpOnly: true,
      });
}

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

      // function call
      updating(req, res);
      
  
      // Render personalinfo.ejs with updated information
      res.render('personalinfo', { user: updatedUser });
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
      
      // Fetch updated user information
      const updatedUser = await User.findById(userId);

      // Update name 
      req.user.email = email;

      // function call
      updating(req, res);
      
      // Render personalinfo.ejs with updated information
      res.render('personalinfo', { user: updatedUser });
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
      
      // Fetch updated user information
      const updatedUser = await User.findById(userId);


      // Update name
      req.user.phone = phone;
      
      // function call
      updating(req, res);
      
      // Render personalinfo.ejs with updated information
      res.render('personalinfo', { user: updatedUser });
  } catch (err) {
      console.error(err);
      res.status(500).send(`Error updating name: ${err.message}`);
  }
};


// updating the password
exports.updatepassword = async (req, res) => {
  try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.id;

      // Find the user by ID
      const user = await User.findById(userId);

      // Check if the old password matches
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
          return res.status(401).send('Incorrect old password');
      }

      // Hash the new password
      const salt = await bcrypt.genSalt();
      const newPasswordHash = await bcrypt.hash(newPassword, salt);

      // Update the password in the database
      await User.findByIdAndUpdate(userId, { password: newPasswordHash });

      // res.status(200).send('Password updated successfully');
      res.render('security');
  } catch (err) {
      console.error(err);
      res.status(500).send(`Error updating password: ${err.message}`);
  }
};

// Route for deleting the user
exports.deleteuser = async (req, res) => {
  try {
      const userId = req.user.id;

      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).send('User not found');
      }

      // Perform any necessary cleanup or additional actions here

      // Delete the user from the database
      await User.findByIdAndDelete(userId);

      // res.status(200).send('User deleted successfully');
      res.clearCookie('token').redirect('/login');
  } catch (err) {
      console.error(err);
      res.status(500).send(`Error deleting user: ${err.message}`);
  }
};


// Logout
exports.logout = async (req, res) => {
  
    res.clearCookie('token').redirect('/login');
}
