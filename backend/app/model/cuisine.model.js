const mongoose = require("mongoose")

const CuisineSchema = mongoose.Schema({
  name: String,
  isDeleted: Boolean
})

module.exports = mongoose.model("Cuisine",CuisineSchema);