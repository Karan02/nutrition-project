const UserType = require('../../model/user-type.model');
const MacroNutrientDistribution = require('../../model/macro-nutrient-distribution.model');
const _ = require('lodash');

exports.general = async (user, allMeals) => {
    user.physicalActivityLevel = physicalActivityLevel(user);
    const {BMI, recommendedKcal} = recommendedDailyKcal(user);
    const userType = await UserType.findOne({userType: 'GENERAL'});
    const macroNutrientDistribution = await MacroNutrientDistribution.findOne({userType: 'GENERAL'});
    const hour = new Date().getHours();
    let recommendedMealKcal;
    if(hour < 12) {
        recommendedMealKcal = 33/100*recommendedKcal;
    }
    else if(hour >= 12 && hour < 18) {
        recommendedMealKcal = 33/100*recommendedKcal;
    }
    else {
        recommendedMealKcal = 33/100*recommendedKcal;
    }
    const meals = allMeals.map(item => {
        // console.log(item.nutrient.totalNutrients);
        item.score = [];
        item.score.push(totalCalories(recommendedMealKcal, item.nutrient.totalNutrients.ENERC_KCAL.quantity, userType.totalCalories[user.goals]));
        if((user.breakfast.length + user.lunch.length + user.dinner.length > 30)) {
            item.score.push(macroNutrient(item.nutrient.totalNutrients, userType.macroNutrient, macroNutrientDistribution, recommendedMealKcal));
        } else {
            item.score.push(protein(recommendedKcal, item.nutrient.totalNutrients, userType.protien));
        }
        item.score.push(addedSugar(recommendedKcal, item.nutrient.totalNutrients, userType.addedSugar));
        item.score.push(saturatedFat(recommendedKcal, item.nutrient.totalNutrients, userType.saturatedFat));
        item.score.push(transFat(recommendedKcal, item.nutrient.totalNutrients, userType.transFat));
        item.score.push(sodium(item.nutrient.totalNutrients, userType.sodium));
        item.score.push(carbDietaryFiber(recommendedKcal, item.nutrient.totalNutrients, userType.carbDietaryFiber));
        item.score.push(goodSources(item.nutrient.totalNutrients, userType.goodSources, user.gender));
        item.nutrient = undefined;
        item.userType = 'GENERAL';
        // item.scoreList = item.score;
        // console.log(item.score);
        if(item.score.includes('red')) {
            item.flag = 'red';
            item.mealScore = 0;
        }
        else {
            item.finalScore = item.score.reduce(function(a, b) {
                return a + b;
            }, 0);
            if(item.finalScore <= 24 && item.finalScore >= 16) {
                item.flag = 'green';
            }
            else if(item.finalScore <= 16 && item.finalScore >= 8) {
                item.flag = 'yellow';
            }
            else {
                item.flag = 'red';
            }
            item.mealScore = item.finalScore/8;
        }
        return item;
    });
    return meals;
}

exports.highBP = async (user, allMeals) => {
    user.physicalActivityLevel = physicalActivityLevel(user);
    const {BMI, recommendedKcal} = recommendedDailyKcal(user);
    const userType = await UserType.findOne({userType: 'HIGH_BP'});
    const macroNutrientDistribution = await MacroNutrientDistribution.findOne({userType: 'HIGH_BP'});
    const hour = new Date().getHours();
    const bmiText = BMI <= 25 ? 'bmiLessThan25' : 'bmiMoreThan25';
    let recommendedMealKcal;
    if(hour < 12) {
        recommendedMealKcal = 33/100*recommendedKcal;
    }
    else if(hour >= 12 && hour < 18) {
        recommendedMealKcal = 33/100*recommendedKcal;
    }
    else {
        recommendedMealKcal = 33/100*recommendedKcal;
    }
    const meals = allMeals.map(item => {
        item.score = [];
        item.score.push(totalCalories(recommendedMealKcal, item.nutrient.totalNutrients.ENERC_KCAL.quantity, userType.totalCalories[bmiText]));
        if ((user.breakfast.length + user.lunch.length + user.dinner.length) > 30) {
            item.score.push(macroNutrient(item.nutrient.totalNutrients, userType.macroNutrient, macroNutrientDistribution, recommendedMealKcal));
        } else {
            item.score.push(protein(recommendedKcal, item.nutrient.totalNutrients, userType.protien));
        }
        item.score.push(addedSugar(recommendedKcal, item.nutrient.totalNutrients, userType.addedSugar));
        item.score.push(saturatedFat(recommendedKcal, item.nutrient.totalNutrients, userType.saturatedFat));
        item.score.push(transFat(recommendedKcal, item.nutrient.totalNutrients, userType.transFat));
        item.score.push(sodium(item.nutrient.totalNutrients, userType.sodium));
        item.score.push(carbDietaryFiber(recommendedKcal, item.nutrient.totalNutrients, userType.carbDietaryFiber));
        item.score.push(potassium(item.nutrient.totalNutrients, userType.potassium));
        item.score.push(goodSources(item.nutrient.totalNutrients, userType.goodSources, user.gender));
        item.nutrient = undefined;
        item.userType = 'HIGH_BP';
        item.scoreList = item.score;
        if(item.score.includes('red')) {
            item.flag = 'red';
            item.score = 0;
        }
        else {
            item.score = item.score.reduce(function(a, b) {
                return a + b;
            }, 0);
            item.score = item.score[0];
            if(item.score <= 27 && item.score >= 18) {
                item.flag = 'green';
            }
            else if(item.score <= 18 && item.score >= 9) {
                item.flag = 'yellow';
            }
            else {
                item.flag = 'red';
            }
        }
        return item;
    });
    return meals;
}

exports.highCholestrol = async (user, allMeals) => {
    user.physicalActivityLevel = physicalActivityLevel(user);
    const {BMI, recommendedKcal} = recommendedDailyKcal(user);
    const userType = await UserType.findOne({userType: 'HIGH_CHOLESTROL'});
    const macroNutrientDistribution = await MacroNutrientDistribution.findOne({userType: 'HIGH_CHOLESTROL'});
    const hour = new Date().getHours();
    const bmiText = BMI <= 25 ? 'bmiLessThan25' : 'bmiMoreThan25';
    let recommendedMealKcal;
    if(hour < 12) {
        recommendedMealKcal = 33/100*recommendedKcal;
    }
    else if(hour >= 12 && hour < 18) {
        recommendedMealKcal = 33/100*recommendedKcal;
    }
    else {
        recommendedMealKcal = 33/100*recommendedKcal;
    }
    const meals = allMeals.map(item => {
        item.score = [];
        item.score.push(totalCalories(recommendedMealKcal, item.nutrient.totalNutrients.ENERC_KCAL.quantity, userType.totalCalories[bmiText]));
        if ((user.breakfast.length + user.lunch.length + user.dinner.length) > 30) {
            item.score.push(macroNutrient(item.nutrient.totalNutrients, userType.macroNutrient, macroNutrientDistribution, recommendedMealKcal));
        } else {
            item.score.push(protein(recommendedKcal, item.nutrient.totalNutrients, userType.protien));
        }
        item.score.push(addedSugar(recommendedKcal, item.nutrient.totalNutrients, userType.addedSugar));
        item.score.push(saturatedFat(recommendedKcal, item.nutrient.totalNutrients, userType.saturatedFat));
        item.score.push(transFat(recommendedKcal, item.nutrient.totalNutrients, userType.transFat));
        item.score.push(sodium(item.nutrient.totalNutrients, userType.sodium));
        item.score.push(carbDietaryFiber(recommendedKcal, item.nutrient.totalNutrients, userType.carbDietaryFiber));
        item.score.push(goodSources(item.nutrient.totalNutrients, userType.goodSources, user.gender));
        item.nutrient = undefined;
        item.userType = 'HIGH_CHOLESTROL';
        item.scoreList = item.score;
        if(item.score.includes('red')) {
            item.flag = 'red';
            item.score = 0;
        }
        else {
            item.score = item.score.reduce(function(a, b) {
                return a + b;
            }, 0);
            item.score = item.score[0];
            if(item.score <= 24 && item.score >= 16) {
                item.flag = 'green';
            }
            else if(item.score <= 16 && item.score >= 8) {
                item.flag = 'yellow';
            }
            else {
                item.flag = 'red';
            }
        }
        return item;
    });
    return meals;
} 

exports.highSugar = async (user, allMeals) => {
    user.physicalActivityLevel = physicalActivityLevel(user);
    const {BMI, recommendedKcal} = recommendedDailyKcal(user);
    const userType = await UserType.findOne({userType: 'HIGH_SUGAR'});
    const macroNutrientDistribution = await MacroNutrientDistribution.findOne({userType: 'HIGH_SUGAR'});
    const hour = new Date().getHours();
    const bmiText = BMI <= 25 ? 'bmiLessThan25' : 'bmiMoreThan25';
    let recommendedMealKcal;
    if(hour < 12) {
        recommendedMealKcal = 33/100*recommendedKcal;
    }
    else if(hour >= 12 && hour < 18) {
        recommendedMealKcal = 33/100*recommendedKcal;
    }
    else {
        recommendedMealKcal = 33/100*recommendedKcal;
    }
    const meals = allMeals.map(item => {
        item.score = [];
        item.score.push(totalCalories(recommendedMealKcal, item.nutrient.totalNutrients.ENERC_KCAL.quantity, userType.totalCalories[bmiText]));
        if ((user.breakfast.length + user.lunch.length + user.dinner.length) > 30) {
            item.score.push(macroNutrient(item.nutrient.totalNutrients, userType.macroNutrient, macroNutrientDistribution, recommendedMealKcal));
        } else {
            item.score.push(protein(recommendedKcal, item.nutrient.totalNutrients, userType.protien));
        }
        item.score.push(addedSugar(recommendedKcal, item.nutrient.totalNutrients, userType.addedSugar));
        item.score.push(saturatedFat(recommendedKcal, item.nutrient.totalNutrients, userType.saturatedFat));
        item.score.push(transFat(recommendedKcal, item.nutrient.totalNutrients, userType.transFat));
        item.score.push(sodium(item.nutrient.totalNutrients, userType.sodium));
        item.score.push(carbDietaryFiber(recommendedKcal, item.nutrient.totalNutrients, userType.carbDietaryFiber));
        item.score.push(goodSources(item.nutrient.totalNutrients, userType.goodSources, user.gender));
        item.nutrient = undefined;
        item.userType = 'HIGH_SUGAR';
        item.scoreList = item.score;
        if(item.score.includes('red')) {
            item.flag = 'red';
            item.score = 0;
        }
        else {
            item.score = item.score.reduce(function(a, b) {
                return a + b;
            }, 0);
            item.score = item.score[0];
            if(item.score <= 24 && item.score >= 16) {
                item.flag = 'green';
            }
            else if(item.score <= 16 && item.score >= 8) {
                item.flag = 'yellow';
            }
            else {
                item.flag = 'red';
            }
        }
        return item;
    });
    return meals;
}

exports.athlete = async (user, allMeals) => {
    user.physicalActivityLevel = physicalActivityLevel(user);
    const {BMI, recommendedKcal} = recommendedDailyKcal(user);
    const userType = await UserType.findOne({userType: 'ATHLETE'});
    const macroNutrientDistribution = await MacroNutrientDistribution.findOne({userType: 'ATHLETE'});
    const hour = new Date().getHours();
    let recommendedMealKcal;
    if(hour < 12) {
        recommendedMealKcal = 33/100*recommendedKcal;
    }
    else if(hour >= 12 && hour < 18) {
        recommendedMealKcal = 33/100*recommendedKcal;
    }
    else {
        recommendedMealKcal = 33/100*recommendedKcal;
    }
    const meals = allMeals.map(item => {
        item.score = [];
        item.score.push(totalCalories(recommendedMealKcal, item.nutrient.totalNutrients.ENERC_KCAL.quantity, userType.totalCalories['athleteTotalCalories']));
        if ((user.breakfast.length + user.lunch.length + user.dinner.length) > 30) {
            item.score.push(macroNutrient(item.nutrient.totalNutrients, userType.macroNutrient, macroNutrientDistribution, recommendedMealKcal));
        } else {
            item.score.push(protein(recommendedKcal, item.nutrient.totalNutrients, userType.protien));
        }
        item.score.push(addedSugar(recommendedKcal, item.nutrient.totalNutrients, userType.addedSugar));
        item.score.push(saturatedFat(recommendedKcal, item.nutrient.totalNutrients, userType.saturatedFat));
        item.score.push(transFat(recommendedKcal, item.nutrient.totalNutrients, userType.transFat));
        item.score.push(sodium(item.nutrient.totalNutrients, userType.sodium));
        item.score.push(carbDietaryFiber(recommendedKcal, item.nutrient.totalNutrients, userType.carbDietaryFiber));
        item.score.push(carbs(item.nutrient.totalNutrients, user.currentWeight.unit === 'kgs' ? user.currentWeight.weight : user.currentWeight.weight * 0.45359, userType.carbs[user.gender]))
        item.score.push(goodSources(item.nutrient.totalNutrients, userType.goodSources, user.gender))
        item.nutrient = undefined;
        item.userType = 'ATHLETE';
        item.scoreList = item.score;
        if(item.score.includes('red')) {
            item.flag = 'red';
            item.score = 0;
        }
        else {
            item.score = item.score.reduce(function(a, b) {
                return a + b;
            }, 0);
            item.score = item.score[0];
            if(item.score <= 27 && item.score >= 18) {
                item.flag = 'green';
            }
            else if(item.score <= 18 && item.score >= 9) {
                item.flag = 'yellow';
            }
            else {
                item.flag = 'red';
            }
        }
        return item;
    });
    return meals;
}

const physicalActivityLevel = (data) => {
    switch(data.physicalActivityLevel) {
        case 'NO_EXERCISE':
            return 1.2;
        
        case 'LIGHT_EXERCISE':
            return 1.375;
 
        case 'MODERATE_EXERCISE':
            return 1.55;

        case 'HEAVY_EXERCISE':
            return 1.725;

        case 'VERY_HEAVY_EXERCISE':
            return 1.9;
    }
}

const recommendedDailyKcal = (data) => {
    const heightSplit = data.height.split('\'');
    heightSplit[1] = heightSplit[1].split('\"')[0];
    const height = heightSplit[0]*0.3048 + heightSplit[1]*0.0254;
    let weight = data.currentWeight.weight;
    if(data.currentWeight.unit === 'lbs') {
        weight = data.currentWeight.weight * 0.4536;
    }
    const BMI = weight / (height * height);                                 //Body Mass Index
    const BMR = 10 * weight + 6.25 * height * 100 - 5 * data.age + 5;   
    const maintainWeightKcal = BMR * data.physicalActivityLevel;            // calories required to maintain current weight per day
    let targetWeight = data.targetWeight.weight;
    let targetTime = data.targetWeight.time;
    if(data.targetWeight.weightUnit === 'lbs') {
        targetWeight = data.targetWeight.weight * 0.4536;
    }
    if(data.targetWeight.timeUnit === 'weeks') {
        targetTime = data.targetWeight.time * 7;
    }
    else if(data.targetWeight.timeUnit === 'months') {
        targetTime = data.targetWeight.time * 30;
    }
    let additionalKcal = ((targetWeight - weight)/targetTime) * 7700;       // additional Kcal required to reach the target Weight in target Time   
    const recommendedKcal = maintainWeightKcal + additionalKcal;             // recommeded Kcal require per day to achieve target Weight in target Time   
    return {BMI, recommendedKcal};
}

const totalCalories = (recommededMealKcal, actualMealKcal, userType) => {
    // console.log(actualMealKcal, recommededMealKcal);
    let mealPercentage = Math.abs((1 - (actualMealKcal/recommededMealKcal))*100);
    let score;
    _.mapKeys(userType, (value, key) => {        
        if(value.greaterThan <= mealPercentage && value.lessThan >= mealPercentage) {
            score = value.point;
        }
    });
    // console.log(mealPercentage);
    return score;
}

const macroNutrient = (nutrients, userType, distribution, recommendedMealKcal) => {
    let score = [];
    
    const recommendedCarbs = distribution.carbsPercentage/100*recommendedMealKcal;
    const recommendedFats = distribution.fatsPercentage/100*recommendedMealKcal;
    const recommendedProtiens = distribution.protiensPercentage/100*recommendedMealKcal;

    let carbsPercentage = Math.abs(1 - ((nutrients.CHOCDF ? nutrients.CHOCDF.quantity : 0) * 4) / recommendedCarbs * 100) / 3;

    let fatsPercentage = Math.abs(1 - ((nutrients.FAT ? nutrients.FAT.quantity : 0) * 9) / recommendedFats * 100) / 3;
    
    let protiensPercentage = Math.abs((1 - (nutrients.PROCNT ? nutrients.PROCNT.quantity : 0) * 4) / recommendedProtiens * 100) / 3;

    _.mapKeys(userType.carb, (value, key) => {
        if(value.greaterThan <= carbsPercentage && value.lessThan >= carbsPercentage) {
            score.push(value.point);
        }
    });
    _.mapKeys(userType.fat, (value, key) => {
        if(value.greaterThan <= fatsPercentage && value.lessThan >= fatsPercentage) {
            score.push(value.point);
        }
    });
    _.mapKeys(userType.protien, (value, key) => {                       
        if(value.greaterThan <= protiensPercentage && value.lessThan >= protiensPercentage) {
            score.push(value.point);
        }
    });
    if(score.includes('red')) {
        return 'red';
    }
    else {
        return _.sum(score)/3;     // round off this value
    }
}

const addedSugar = (recommendedDailyKcal, nutrients, userType) => {
    const sugar = nutrients['SUGAR.added'] ? nutrients['SUGAR.added'].quantity * 4 : 0
    const sugarPercentage = sugar / recommendedDailyKcal * 100;
    let score;
    _.mapKeys(userType, (value, key) => {
        if(value.greaterThan <= sugarPercentage && value.lessThan >= sugarPercentage) {
            score = value.point;
        }
    })
    return score;
}

const saturatedFat = (recommendedDailyKcal, nutrients, userType) => {
    const saturatedFat = nutrients.FASAT ? nutrients.FASAT.quantity * 9 : 0
    const saturatedFatPercentage = saturatedFat / recommendedDailyKcal * 100;
    let score;
    _.mapKeys(userType, (value, key) => {
        if(value.greaterThan <= saturatedFatPercentage && value.lessThan >= saturatedFatPercentage) {
            score = value.point;
        }
    })
    return score;
}

const transFat = (recommendedDailyKcal, nutrients, userType) => {
    const transFat = nutrients.FATRN ? nutrients.FATRN.quantity * 4 : 0
    const transFatPercentage = transFat / recommendedDailyKcal * 100;
    let score;
    _.mapKeys(userType, (value, key) => {
        if(value.greaterThan <= transFatPercentage && value.lessThan >= transFatPercentage) {
            score = value.point;
        }
    })
    return score;
}

const sodium = (nutrients, userType) => {
    const sodium = nutrients.NA ? nutrients.NA.quantity : 0
    let score;
    _.mapKeys(userType, (value, key) => {
        if(value.greaterThan <= sodium && value.lessThan >= sodium) {
            score = value.point;
        }
    });
    return score;
}

const carbDietaryFiber = (recommendedDailyKcal, nutrients, userType) => {
    const carbDietaryFiber = nutrients.FIBER ? nutrients.FIBER.quantity * 4 : 0
    const carbDietaryFiberPercentage = carbDietaryFiber / recommendedDailyKcal * 100;
    let score;
    _.mapKeys(userType, (value, key) => {
        if(value.greaterThan <= carbDietaryFiberPercentage && value.lessThan >= carbDietaryFiberPercentage) {
            score = value.point;
        }
    })
    return score;
}

const protein = (recommendedDailyKcal, nutrients, userType) => {
    const proteins = nutrients.PROCNT ? nutrients.PROCNT.quantity * 4 : 0
    const proteinsPercentage = proteins / recommendedDailyKcal * 100;
    let score;
    _.mapKeys(userType, (value, key) => {
        if(value.greaterThan <= proteinsPercentage && value.lessThan >= proteinsPercentage) {
            score = value.point;
        }
    })
    return score;
}

const potassium = (nutrients, userType) => {
    const potassium = nutrients.K ? nutrients.K.quantity / 3 : 0
    let score;
    _.mapKeys(userType, (value, key) => {
        if(value.greaterThan <= potassium && value.lessThan >= potassium) {
            score = value.point;
        }
    })
    return score;
}

const carbs = (nutrients, weight, userType) => {
    const carbsPerKg = nutrients.CHOCDF ? weight / nutrients.CHOCDF.quantity : 0 
    let score;
    _.mapKeys(userType, (value, key) => {
        if(value.greaterThan <= carbsPerKg && value.lessThan >= carbsPerKg) {
            score = value.point;
        }
    })
    return score;
}

const goodSources = (nutrients, userType, gender) => {
    let score = 0;
    nutrients.CA ? nutrients.CA.quantity/10 > userType.CA[gender] ? score = score + 1 : null : null; 
    nutrients.FE ? nutrients.FE.quantity/10 > userType.FE[gender] ? score = score + 1 : null : null;
    nutrients.K ? nutrients.K.quantity/10 > userType.K[gender] ? score = score + 1 : null : null;
    // nutrients.ZN ? nutrients.ZN.quantity/10 > userType.zinc[gender] ? score = score + 1 : null : null;
    nutrients.MG ? nutrients.MG.quantity/10 > userType.MG[gender] ? score = score + 1 : null : null;
    nutrients.VITA_RAE ? nutrients.VITA_RAE.quantity/10 > userType.VITA_RAE[gender] ? score = score + 1 : null : null;
    nutrients.VITC ? nutrients.VITC.quantity/10 > userType.VITC[gender] ? score = score + 1 : null : null;
    nutrients.VITD ? nutrients.VITD.quantity/10 > userType.VITD[gender] ? score = score + 1 : null : null;
    nutrients.THIA ? nutrients.THIA.quantity/10 > userType.THIA[gender] ? score = score + 1 : null : null;
    nutrients.RIBF ? nutrients.RIBF.quantity/10 > userType.RIBF[gender] ? score = score + 1 : null : null;
    nutrients.VITB6A ? nutrients.VITB6A.quantity/10 > userType.VITB6A[gender] ? score = score + 1 : null : null;
    nutrients.TOCPHA ? nutrients.TOCPHA.quantity/10 > userType.TOCPHA[gender] ? score = score + 1 : null : null;
    switch (score) {
        case 0:
            return 0;
        
        case 1:
            return 1;
        
        case 2:
            return 2;
        
        default:
            return 3;
    }
}
