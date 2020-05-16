const mongoose = require("mongoose")

const foodGroupSchema = mongoose.Schema({
  name: String,
  isDeleted: Boolean
})

module.exports = mongoose.model("FoodGroup",foodGroupSchema);