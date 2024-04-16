const Hotel = require("../models/hotel");

//search hotel

exports.searchHotel = async (req, res) => {
  try {
    let { destination, checkIn, checkOut, guests } = req.query;

    destination = destination.charAt(0).toUpperCase() + destination.slice(1).toLowerCase();

    //array of hotels with entered destination
    const searchedHotels = await Hotel.find({ hotelAddress: destination });

    res.status(200).json({ hotels: searchedHotels });


    let currDate = new Date();
    let checkInDate = new Date(checkIn);
    let checkOutDate = new Date(checkOut);
    
    if (checkInDate < currDate) {
      console.log("Invalid checkIn date");
    } else if (checkInDate > checkOutDate){
      console.log("Invalid checkOut date");
    } 
    



  } catch (error) {
    console.error("Error searching for hotels:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
