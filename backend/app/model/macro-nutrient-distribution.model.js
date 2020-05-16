const mongoose = require('mongoose');

// recommended Macro Nutrient Distribution percentage-wise

const macroNutrientDistribution = mongoose.Schema({
    userType: String,
    carbsPercentage: Number,
    fatsPercentage: Number,
    protiensPercentage: Number
});

module.exports = mongoose.model('MacroNutrientPercentage', macroNutrientDistribution);
