const Meal = require('../../model/meal.model');
const Customer = require('../../model/customer.model');
const UserType = require('../../model/user-type.model');
const mongoose = require('mongoose');
const _ = require('lodash');

exports.nutriDocData = async (req, res) => {
    const customer = await Customer.findOne({_id: new mongoose.Types.ObjectId(req.query.userId)});
    const breakfastMeals = await Meal.find({_id: {$in: customer.breakfast}}, {_id: 1, nutrient: 1});
    const lunchMeals = await Meal.find({_id: {$in: customer.lunch}}, {_id: 1, nutrient: 1});
    const dinnerMeals = await Meal.find({_id: {$in: customer.dinner}}, {_id: 1, nutrient: 1});
    const userType = await UserType.findOne({userType: customer.userType});
    const nutriDocLogic = (mealTimeMeals) => {
        const initialValue = {
            carbs: {
                FIBTG: 0,
                SUGAR: 0,
            },
            fats: {
                FASAT: 0,
                FATRN: 0,
                FAMS: 0,
                FAPU: 0
            },
            proteins: {
                PROCNT: 0,
            },
            microNutrient: {
                CA: 0,
                FE: 0,
                K: 0,
                MG: 0,
                VITB12: 0,
                VITA_RAE: 0,
                VITC: 0,
                VITD: 0,
                THIA: 0,
                RIBF: 0,
                VITB6A: 0,
                TOCPHA: 0,
            }
        };
        mealTimeMeals.forEach(item => {
            _.mapKeys(initialValue, (outerKey, outerValue) => {
                _.mapKeys(outerKey, (innerKey, innerValue) => {
                    initialValue[outerValue][innerValue] = initialValue[outerValue][innerValue] + item.nutrient.totalNutrients[innerValue] ? Math.floor(item.nutrient.totalNutrients[innerValue].quantity) : 1;
                });
            });
        });
        const microNutrientList = [];
        _.mapKeys(initialValue.microNutrient, (key, value) => {
            microNutrientList.push({name: value, value: ((key/mealTimeMeals.length)/userType.goodSources[value][customer.gender]) * 100})
        });
        const data = [
            {name: 'Macro-Nutrients', description: 'Distribution of macronutrients you have consumed shown below', carbs: initialValue.carbs, fats: initialValue.fats, proteins: initialValue.proteins},
            {name: 'Micro-Nutrients', description: 'Portion of Recommended Daily Intake Consumed Per Meal', microNutrients: microNutrientList}
        ]
        return data;
    }
    const breakfast = nutriDocLogic(breakfastMeals);
    const lunch = nutriDocLogic(lunchMeals);
    const dinner = nutriDocLogic(dinnerMeals);
    const nutriScore = Math.floor(customer.nutriScore/(breakfastMeals.length + lunchMeals.length + dinnerMeals.length));
    console.log(nutriScore);

    res.json({
        status: true,
        macroNutrient: {breakfast,
        lunch,
        dinner,},
        nutriScore,
    })
}