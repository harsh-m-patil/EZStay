const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
	hotelname: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String
	},
	password: {
		type: String,
		required: true
	},
	contactNo: {
		type: String,
		required: true,
		unique: true,
		match: /^[0-9\-]+$/
	},
	location: {
		type: String,
		required: true
	},
	hotel: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Hotel',
		default: null
	}
});

module.exports = mongoose.model('Business', businessSchema);
