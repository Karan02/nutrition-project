const MacroNutrient = require('../../model/macro-nutrient-distribution.model');

exports.createMacroNutrientDistribution = async (req, res) => {
    const newUserType = {userType: 'athlete', carbsPercentage: 65, fatsPercentage: 20, protiensPercentage: 15};
    MacroNutrient.create(newUserType);
}

