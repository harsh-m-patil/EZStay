const Hotel = require("../models/hotel.model");

const handleSearchHotel = async (req, res) => {
  try {
    let { destination, checkIn, checkOut, guests, clickedHotelName } =
      req.query;

    destination =
      destination.charAt(0).toUpperCase() + destination.slice(1).toLowerCase();

    // if (!destination) {
    //   return res.redirect("index");
    // }
    console.log(clickedHotelName);

    const searchedHotels = await Hotel.find({ hotelAddress: destination });

    let currDate = new Date();
    let checkInDate = new Date(checkIn);
    let checkOutDate = new Date(checkOut);

    if (checkInDate < currDate) {
      console.log("Invalid check-in date");
    } else if (checkInDate >= checkOutDate) {
      console.log("Invalid check-out date");
    }

    //handleClickedHotel method content start
    // console.log("Clicked hotel :", clickedHotelName);
    // const clickedHotel = await Hotel.findOne({ hotelName: clickedHotelName });
    // console.log(clickedHotel);

    //handleClickedHotel method content end

    return res.render("searchedHotel", { hotels: searchedHotels });
  } catch (error) {
    console.error("Error searching for hotels:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



async function handleClickedHotel(req, res) {
  let { clickedHotelName, checkIn, checkOut } = req.query;
  const clickedHotel = await Hotel.findOne({ hotelName: clickedHotelName });

  return res.render("hotelInfo", { clickedHotel: clickedHotel });
}

module.exports = {
  handleSearchHotel,
  handleClickedHotel,
};
