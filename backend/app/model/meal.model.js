const mongoose = require("mongoose")


const mealSchema = mongoose.Schema({
  mealName: String,
  mealCategory: Object,
  mealCuisine: Object,
  mealSize: String,
  mealPrice: Number,
  mealQuantity: String,
  isDeleted: Boolean,
  createdAt: Date,
  editedAt: Date,
  imageURL: String,
  ingredients: Array,
  restaurantID: Object,
  price: Number,
  nutrient: Object,
  score: Array,
  flag: String,
  nutrient: {type:Object,required:true},
  mealScore: Number,
  // restaurant: Array,
});

module.exports = mongoose.model('Meal', mealSchema);
