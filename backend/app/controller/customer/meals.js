const Meal = require('../../model/meal.model');
const Customer = require('../../model/customer.model');
const Restaurant = require('../../model/restaurant.model');
const nutrientComposition = require('../helper/nutrientComposition');
const axios = require('axios');
const {ObjectId} = require('mongodb');

exports.orderMeal = async (req, res) => {
    console.log(req.body);
    await Customer.updateOne({_id: req.body.userId}, {$push: {[req.body.mealTime.toLowerCase()]: ObjectId(req.body.mealId)}, $inc: {nutriScore: req.body.score}})
    res.json({
        status: true,
        message: 'Meal ordered',
    });
}

exports.getAllMeals = async (req, res) => {
    
    const customer = await Customer.findOne({_id: req.query.userId});
    const search = new RegExp(req.query.search,"i")
    
    req.query.lowerPrice = parseInt(req.query.lowerPrice);
    req.query.upperPrice = parseInt(req.query.upperPrice);
    let meals = await Meal.aggregate([{$lookup: {
        from: 'restaurants',
        localField: 'restaurantID',
        foreignField: '_id',
        as: 'restaurant'
        }
        }, {
            $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$restaurant", 0]}, "$$ROOT"]}}
        }, {
            $addFields: {
                returnObject: {
                    $or: [
                        {$regexMatch: {input: '$mealName', regex: search}}, 
                        {$regexMatch: {input: '$name', regex: search}}
                    ]
                }
            }
        }, {
            $match: {'returnObject': {$ne: false}, mealPrice: {$lt: req.query.upperPrice, $gt: req.query.lowerPrice}}
        }, {
            $project: { mealName: 1, name: 1, nutrient: 1, mealPrice: 1}
        }, {
            $skip: (req.query.page - 1) * 10,
        }, {
            $limit: 10
        }]);
        
    let data;
    switch(customer.userType) {
        case 'GENERAL': 
            data = await nutrientComposition.general(customer, meals);
            break;
        case 'HIGH_BP':     
            data = await nutrientComposition.highBP(customer, meals);
            break;
        case 'HIGH_CHOLESTROL':
            data = await nutrientComposition.highCholestrol(customer, meals);
            break;
        case 'HIGH_SUGAR':
            data = await nutrientComposition.highSugar(customer, meals);
            break;
        case 'ATHLETE':
            data = await nutrientComposition.athlete(customer, meals);
            break;
    }
    res.json({
        status: true,
        message: 'data',
        data: data
    });
}