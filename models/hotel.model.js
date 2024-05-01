const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  hotelId: {
    type: Number,
    // required: true
  },
  hotelName: {
    type: String,
    required: true
  },
  hotelAddress: {
    type: String,
    required: true
  },
  hotelPrice: {
    type: Number,
    required: true
  },
  imageLinks: {
    // type: [String],
    // required: true
    data: String,
    contentType: String
  },
  rating: {
    type: Number,
    // required: true
  },
  flag: {
    type: Number,
    // required: true 
  },
  revenue: {
    type:Number,
    default: 0,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
