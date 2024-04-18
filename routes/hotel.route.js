const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const {handleSearchHotel,handleClickedHotel} = require('../controllers/hotel.controller');


// Fetch hotel data function
const fetchHotelData = async () => {
  let client;
  try {
    client = new MongoClient(process.env.url);
    await client.connect();
    const database = client.db('ezstay'); 
    const collection = database.collection('hotels'); 
    const hotelData = await collection.find({}).toArray();
    return hotelData;
  } catch (error) {
    console.error('Error fetching hotel data:', error);
  } finally {
    await client.close();
  }
};

// Call the fetchHotelData function and send hotel data to the client-side
router.get('/hoteldata', async (req, res) => {
  try {
    const hotelData = await fetchHotelData();
    res.json(hotelData);
  } catch (error) {
    console.error('Error sending hotel data to the client:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Route for searching and displaying hotels
router.get('/search', handleSearchHotel);

router.get('/hotelInfo', handleClickedHotel);


module.exports = router;

