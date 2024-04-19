const Booking = require("../models/booking");
const jwt = require('jsonwebtoken');
const {handleClickedHotel} = require('./hotel.controller');


exports.booked = async (req, res) => {
    try {
       
        const token = req.cookies.token;
        
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        const userId = decodedToken.id;
        console.log("User ID:", userId);
          // console.log(clickedHotel);
        // Extract hotel ID from the request parameters
        // const { hotelId } = req.params.hotelId;
        const { hotelId } = await handleClickedHotel(req, res);
        console.log("Hotel ID:", hotelId);
    
        // Perform any necessary validation on hotelId
    
        // Create a new booking document
        const booking = new Booking({
          user: userId,
          hotel: hotelId
        });
    
        // Save the booking to the database
        await booking.save();
    
        res.status(201).send('Booking successful');
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
}