// import mongoose from "mongoose"
const mongoose = require("mongoose")

const ingredientSchema = mongoose.Schema({
  ingredient: String,
  foodGroup: Object,
  foodType: Object,
  toppings: Boolean,
  cups: Number,
  cupsgrams:Number,
  servingsgrams: Number,
  tablespoons: Number,
  gramPerCup: Number,
  gramPerTbsp:Number,
  servingSize: Number,
  servingOunces: Number,
  servingMl: Number,
  isDeleted: Boolean,
  restaurantID: Object,
});

module.exports = mongoose.model('Ingredients',ingredientSchema)