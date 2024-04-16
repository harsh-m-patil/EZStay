const Hotel = require("../models/hotel.model");

const handleSearchHotel = async (req, res) => {
  try {
    let { destination, checkIn, checkOut, guests } = req.query;

    destination =
      destination.charAt(0).toUpperCase() + destination.slice(1).toLowerCase();

    const searchedHotels = await Hotel.find({ hotelAddress: destination });

    let currDate = new Date();
    let checkInDate = new Date(checkIn);
    let checkOutDate = new Date(checkOut);

    if (checkInDate < currDate) {
      console.log("Invalid check-in date");
    } else if (checkInDate >= checkOutDate) {
      console.log("Invalid check-out date");
    }

    return res.render('searchedHotel', { hotels: searchedHotels });

  } catch (error) {
    console.error("Error searching for hotels:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  handleSearchHotel 
};
