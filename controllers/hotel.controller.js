const Hotel = require("../models/hotel.model");


const handleSearchHotel = async (req, res) => {
  try {
    let { destination, checkIn, checkOut, guests, clickedHotelName } =
      req.query;

    // destination =
    //   destination.charAt(0).toUpperCase() + destination.slice(1).toLowerCase();

    if (!destination) {
      return res.redirect("index");
    }

    // console.log(`${checkIn} and ${checkOut}`);

    const searchedHotels = await Hotel.find({ hotelAddress: destination });

    let currDate = new Date();
    let checkInDate = new Date(checkIn);
    let checkOutDate = new Date(checkOut);

    if (checkInDate > currDate) {
      console.log("Invalid check-in date");
    }

    return res.render("searchedHotel", {
      hotels: searchedHotels,
      checkIn: checkIn,
      checkOut: checkOut,
    });
  } catch (error) {
    console.error("Error searching for hotels:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

async function handleClickedHotel(req, res) {
  let { clickedHotelName, checkIn, checkOut } = req.query;

  const clickedHotel = await Hotel.findOne({ hotelName: clickedHotelName });
  // const hotelId = clickedHotel.hotelId;

  // console.log(clickedHotel);
  req.session.clickedHotel = clickedHotel;

  // return hotelId;
  return res.render("hotelInfo", {
    clickedHotel: clickedHotel,
    checkIn: checkIn,
    checkOut: checkOut,
    hotelId: clickedHotel._id
  });
}

module.exports = {
  handleSearchHotel,
  handleClickedHotel,
  // clickedHotel
};
