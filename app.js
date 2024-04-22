const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');


// Configurations
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(session({
//     secret: 'secretKey',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 60000 }
//   }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));



  app.set('view engine', 'ejs');
  

// Serve static files

global.staticpath = path.join(__dirname, "views");
app.use(express.static(staticpath));
app.use("/business", express.static(staticpath));

// MongoDB connection setup
const PORT = process.env.PORT || 6000;
mongoose
  .connect(process.env.url, {})
  .then(() => {
    app.listen(PORT, () => console.log(`server port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

// Routes setup
const hotelroutes = require("./routes/hotel.route");
app.use("/", hotelroutes);

const userroutes = require("./routes/user");
app.use("/", userroutes);

const businessroutes = require("./routes/business");
app.use("/business", businessroutes);

const guestroutes = require('./routes/guest');
app.use('/', guestroutes);

const bookingroutes = require('./routes/booking');
app.use('/', bookingroutes);

const superuserroutes = require('./routes/superuser');
app.use('/', superuserroutes);

