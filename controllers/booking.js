const Booking = require("../models/booking");
const jwt = require('jsonwebtoken');



exports.booked = async (req, res) => {
    try {
        // Get the token from the request cookies
        const token = req.cookies.token;
        
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        const userId = decodedToken.id;
        console.log("User ID:", userId);
          
        const clickedHotel = req.session.clickedHotel;
        const dates = req.session.dates

        

        const hotelId = clickedHotel._id;

        console.log("Hotel ID:", hotelId);
    
        console.log("checkIn:",dates.checkIn);
        console.log("checkOut:",dates.checkOut);
    
        // Create a new booking document
        const booking = new Booking({
          user: userId,
          hotel: hotelId,
          checkIn:dates.checkIn,
          checkOut:dates.checkOut
        });
    
        // Save the booking to the database
        await booking.save();
    
        res.status(201).send('Booking successful');
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
}