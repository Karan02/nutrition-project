const mongoose = require('mongoose');

const usertypeSchema = mongoose.Schema({
    userType: String,
    totalCalories: Object,
    macroNutrient: Object,
    carbs: Object,
    addedSugar: Object,
    saturatedFat: Object,
    transFat: Object,
    sodium: Object,
    carbDietaryFiber: Object,
    protien: Object,
    potassium: Object,
    criticalNutrients: Object,
    carbs: Object,
    goodSources: Object,
});

module.exports = mongoose.model('Usertype', usertypeSchema);
