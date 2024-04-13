const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  hotelname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String
    
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Business", businessSchema);
