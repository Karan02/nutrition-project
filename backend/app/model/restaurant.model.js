const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  role: String,
  location: Object,
  pickupAvailable: Boolean,
  isLoggedIn: Boolean,
  bankDetails: Array
});

module.exports = mongoose.model('Restaurant', restaurantSchema);