const mongoose = require("mongoose")

const mealCategorySchema = mongoose.Schema({
  name: String,
  isDeleted: Boolean
})

module.exports = mongoose.model("MealCategory",mealCategorySchema);