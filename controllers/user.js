const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Booking = require("../models/booking");
const nodemailer = require("nodemailer");
const randomString = require("randomstring");

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
      role: "user"
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
      role: user.role,
    };

    const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });


    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.redirect("/index");
  } catch (err) {
    console.error(err);

    res.status(500).send(`Error logging in: ${err.message}`);
  }
};


// forget password
exports.forgetpassword = async (req, res) => {
 
  res.clearCookie('token').render('forget');
 
}


// function for forget password
const sendresetpasswordmail = async (fullname, email, token) => {
  try {
    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      requireTLS: true,
      auth: {
        user: process.env.hotelemail,
        pass: process.env.hotelpass,
      },
    });

    const mailoptions = {
        from: 'ezstay.hotels@gmail.com',
        to: email,
        subject: 'For Reset Password', 
        html:'<p> Hi '+fullname+', please click here to <a href="http://localhost:3000/forget-password?token='+token+'"> reset </a> your password. </p>'
    }

    transporter.sendMail(mailoptions, function(err, info){
      if(err){
        console.log(err);
      }
      else{
        console.log("Email has been sent:-",info.response);
      }
    })

    
  } catch (err) {
    console.log(err.message);
  }
}

exports.forgetverify = async (req, res) => {
  try {
    const {email} = req.body;
    const userdata = await User.findOne({ email });
    if(!userdata)  return res.status(401).send("user with this email not found");
    
    const randomstring = randomString.generate();
    

    const updatedata = await User.updateOne({email},{$set:{token:randomstring}});
    sendresetpasswordmail(userdata.fullname, userdata.email, randomstring);
    // res.render('forget', {message:"Please check your mail to reset your password."})
    res.status(200).send('Please check your mail to reset your password.');
    

  } catch (err) {
    console.log(err.message);
  }
}


exports.forgetpaswordload = async (req, res) => {
  try {

    const token = req.query.token;
    const tokendata = await User.findOne({token});
    if(!tokendata)  return res.status(401).send("token is invalid");
   
    res.render('forget-password',{user_id:tokendata._id});

    
  } catch (err) {
    console.log(err.message);
  }
}


exports.resetpassword = async (req, res) => {
  try {
    const { password , _id} = req.body;
    

    const user = await User.findOne({ _id });


    // Hash the new password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Update the password in the database
    await User.findByIdAndUpdate(user._id,{$set:{password:passwordHash, token:''}});

          
     res.redirect("/login");
    
  } catch (err) {
    console.log(err.message);
    
  }
}

//index
exports.index = async (req, res) => {
  
  res.render('index', { user: req.user });
};

// dasboard
exports.userdashboard = async (req, res) => {
 
  try {
    
    const userId = req.user.id; 
    
    const bookings = await Booking.find({ user: userId }).populate('hotel').populate('user');

    
    
    res.render('userdashboard', { bookings: bookings });
} catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).send('Internal server error');
}
};


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
