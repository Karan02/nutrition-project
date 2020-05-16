const mongoose = require("mongoose")

const foodTypeSchema = mongoose.Schema({
  name: String,
  group: Object,
  isDeleted: Boolean
})

module.exports = mongoose.model("FoodType",foodTypeSchema);