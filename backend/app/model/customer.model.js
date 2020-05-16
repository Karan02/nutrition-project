const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
	profilePicture: String,
	fName: String,
	lName: String,
	email: String,
	password: String,
  	phone: String,
	bankDetails: Object,
	role: String,
	gender: String,
	age: Number,
	height: String,
	goals: {
		type: String,
		enum: ['LOSE_WEIGHT', 'MAINTAIN_WEIGHT', 'GAIN_WEIGHT']
	},
	currentWeight: Object,
	targetWeight: Object,
	physicalActivityLevel: {
		type: String,
		enum: ['NO_EXERCISE', 'LIGHT_EXERCISE', 'MODERATE_EXERCISE', 'HEAVY_EXERCISE', 'VERY_HEAVY_EXERCISE']
	},
	allergies: Array,
	dietaryNeeds: Array,
	breakfast: Array,
	lunch: Array,
	dinner: Array,
	userType: {
		type: String,
		enum: ['GENERAL', 'HIGH_BP', 'HIGH_CHOLESTROL', 'HIGH_SUGAR', 'ATHLETE']
	},
	foodWeight: Object,
	nutriScore: Number,
});

module.exports = mongoose.model('Customer', customerSchema);