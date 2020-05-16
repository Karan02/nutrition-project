const Usertype = require('../../model/user-type.model');

// enum: ['general', 'highBP', 'highCholestrol', 'highSugar', 'athlete']

/////////////////////////////general//////////////////////////////////

// exports.createUserType = async (req, res) => {
//     const totalCalories = {
//         weightGain: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             twoPoint: {
//                 greaterThan: 10,
//                 lessThan: 15,
//                 point: 2
//             },
//             onePoint: {
//                 greaterThan: 15,
//                 lessThan: 20,
//                 point: 1
//             },
//             zeroPoint: {
//                 greaterThan: 20,
//                 lessThan: 30,
//                 point: 0
//             },
//             redPoint: {
//                 greaterThan: 30,
//                 lessThan: 1000000,
//                 point: 'red',
//             },
//         },
//         weightLoss: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             zeroPoint: {
//                 greaterThan: 10,
//                 lessThan: 20,
//                 point: 0
//             },
//             redPoint: {
//                 greaterThan: 20,
//                 lessThan: 1000000,
//                 point: 'red',
//             },
//         },
//         maintainWeight: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             twoPoint: {
//                 greaterThan: 10,
//                 lessThan: 15,
//                 point: 2
//             },
//             onePoint: {
//                 greaterThan: 15,
//                 lessThan: 20,
//                 point: 1
//             },
//             zeroPoint: {
//                 greaterThan: 20,
//                 lessThan: 30,
//                 point: 0
//             },
//             redPoint: {
//                 greaterThan: 30,
//                 lessThan: 1000000,
//                 point: 'red',
//             },
//         },
//     }
//     const macroNutrient = {
//         protien: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             onePoint: {
//                 greaterThan: 10,
//                 lessThan: 20,
//                 point: 1
//             },
//             zeroPoint: {
//                 greaterThan: 30,
//                 lessThan: 1000000,
//                 point: 0
//             },
//         },
//         carb: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             twoPoint: {
//                 greaterThan: 10,
//                 lessThan: 20,
//                 point: 2
//             },
//             onePoint: {
//                 greaterThan: 20,
//                 lessThan: 30,
//                 point: 1
//             },
//             redPoint: {
//                 greaterThan: 30,
//                 lessThan: 1000000,
//                 point: 'red',
//             },
//         },
//         fat: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             twoPoint: {
//                 greaterThan: 10,
//                 lessThan: 20,
//                 point: 2
//             },
//             onePoint: {
//                 greaterThan: 20,
//                 lessThan: 30,
//                 point: 1
//             },
//             redPoint: {
//                 greaterThan: 30,
//                 lessThan: 1000000,
//                 point: 'red',
//             },
//         }
//     }
//     const addedSugar = {
//         threePoint: {
//             greaterThan: 0,
//             lessThan: 1,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 1,
//             lessThan: 3,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 3,
//             lessThan: 5,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 5,
//             lessThan: 10,
//             point: 0
//         },
//         redPoint: {
//             greaterThan: 10,
//             lessThan: 1000000,
//             point: 'red'
//         }
//     }
//     const saturatedFat = {
//         threePoint: {
//             greaterThan: 0,
//             lessThan: 1,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 1,
//             lessThan: 3,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 3,
//             lessThan: 5,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 5,
//             lessThan: 10,
//             point: 0
//         },
//         redPoint: {
//             greaterThan: 10,
//             lessThan: 1000000,
//             point: 'red'
//         }
//     }
//     const transFat = {
//         threePoint: {
//             greaterThan: 0,
//             lessThan: 0,
//             point: 3
//         },
//         redPoint: {
//             greaterThan: 0,
//             lessThan: 1000000,
//             point: 'red' 
//         }
//     }
//     const sodium = {
//         threePoint: {
//             greaterThan: 0,
//             lessThan: 400,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 400,
//             lessThan: 800,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 800,
//             lessThan: 1200,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 1200,
//             lessThan: 2400,
//             point: 0
//         },
//         redPoint: {
//             greaterThan: 2400,
//             lessThan: 1000000,
//             point: 'red'
//         }
//     }
//     const carbDietaryFiber = {
//         threePoint: {
//             greaterThan: 2,
//             lessThan: 1000000,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 1,
//             lessThan: 2,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 0,
//             lessThan: 1,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 0,
//             lessThan: 0,
//             point: 0
//         }
//     }
//     const protien = {
//         threePoint: {
//             greaterThan: 5,
//             lessThan: 1000000,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 3,
//             lessThan: 5,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 0,
//             lessThan: 3,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 0.00000001,
//             lessThan: 0,
//             point: 0
//         }
//     }
//     const goodSources = {
//         CA: {
//             Male: 1000,
//             Female: 1000
//         },
//         FE: {
//             Male: 8,
//             female: 18
//         },
//         K: {
//             Male: 3016,
//             Female: 2320
//         },
//         MG: {
//             Male: 400,
//             Female: 400
//         },
//         VITA_RAE: {
//             Male: 900,
//             Female: 700
//         },
//         VITC: {
//             Male: 90,
//             Female: 75
//         },
//         VITD: {
//             Male: 600,
//             Female: 600
//         },
//         THIA: {
//             Male: 1.2,
//             Female: 1.1
//         },
//         RIBF: {
//             Male: 1.3,
//             Female: 1.1
//         },
//         VITB6A: {
//             Male: 1.3,
//             Female: 1.3
//         },
//         TOCPHA: {
//             Male: 15,
//             Female: 15
//         },
//         VITB12: {
//             Male: 2.4,
//             Female: 2.4
//         }
//     }
//     const newUserType = {userType: 'GENERAL', totalCalories, macroNutrient, addedSugar, saturatedFat, transFat, sodium, carbDietaryFiber, protien, goodSources};
//     Usertype.create(newUserType);
// }

////////////////////////////////////////////////////////////////////////



//////////////////////////////highBP////////////////////////////////////


// exports.createUserType = async (req, res) => {
//     const totalCalories = {
//         bmiLessThan25: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             twoPoint: {
//                 greaterThan: 10,
//                 lessThan: 15,
//                 point: 2
//             },
//             onePoint: {
//                 greaterThan: 15,
//                 lessThan: 20,
//                 point: 1
//             },
//             zeroPoint: {
//                 greaterThan: 20,
//                 lessThan: 30,
//                 point: 0
//             },
//             redPoint: {
//                 greaterThan: 30,
//                 lessThan: 1000000,
//                 point: 'red',
//             },
//         },
//         bmiMoreThan25: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             zeroPoint: {
//                 greaterThan: 10,
//                 lessThan: 20,
//                 point: 0
//             },
//             redPoint: {
//                 greaterThan: 20,
//                 lessThan: 1000000,
//                 point: 'red',
//             },
//         },
//     }
//     const macroNutrient = {
//         protien: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             onePoint: {
//                 greaterThan: 10,
//                 lessThan: 20,
//                 point: 1
//             },
//             zeroPoint: {
//                 greaterThan: 30,
//                 lessThan: 1000000,
//                 point: 0
//             },
//         },
//         carb: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             twoPoint: {
//                 greaterThan: 10,
//                 lessThan: 20,
//                 point: 2
//             },
//             onePoint: {
//                 greaterThan: 20,
//                 lessThan: 30,
//                 point: 1
//             },
//             redPoint: {
//                 greaterThan: 30,
//                 lessThan: 1000000,
//                 point: 'red',
//             },
//         },
//         fat: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             twoPoint: {
//                 greaterThan: 10,
//                 lessThan: 20,
//                 point: 2
//             },
//             onePoint: {
//                 greaterThan: 20,
//                 lessThan: 30,
//                 point: 1
//             },
//             redPoint: {
//                 greaterThan: 30,
//                 lessThan: 1000000,
//                 point: 'red',
//             },
//         }
//     }
//     const addedSugar = {
//         threePoint: {
//             greaterThan: 0,
//             lessThan: 1,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 1,
//             lessThan: 3,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 3,
//             lessThan: 5,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 5,
//             lessThan: 10,
//             point: 0
//         },
//         redPoint: {
//             greaterThan: 10,
//             lessThan: 1000000,
//             point: 'red'
//         }
//     }
//     const saturatedFat = {
//         threePoint: {
//             greaterThan: 0,
//             lessThan: 1,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 1,
//             lessThan: 3,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 3,
//             lessThan: 5,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 5,
//             lessThan: 10,
//             point: 0
//         },
//         redPoint: {
//             greaterThan: 10,
//             lessThan: 1000000,
//             point: 'red'
//         }
//     }
//     const transFat = {
//         threePoint: {
//             greaterThan: 0,
//             lessThan: 0,
//             point: 3
//         },
//         redPoint: {
//             greaterThan: 0.0000001,
//             lessThan: 1000000,
//             point: 'red' 
//         }
//     }
//     const sodium = {
//         threePoint: {
//             greaterThan: 0,
//             lessThan: 400,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 400,
//             lessThan: 800,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 800,
//             lessThan: 1200,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 1200,
//             lessThan: 2400,
//             point: 0
//         },
//         redPoint: {
//             greaterThan: 2400,
//             lessThan: 1000000,
//             point: 'red'
//         }
//     }
//     const carbDietaryFiber = {
//         threePoint: {
//             greaterThan: 2,
//             lessThan: 1000000,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 1,
//             lessThan: 2,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 0,
//             lessThan: 1,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 0.000001,
//             lessThan: 0,
//             point: 0
//         }
//     }
//     const potassium = {
//         threePoint: {
//             greaterThan: 4700,
//             lessThan: 1000000,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 3000,
//             lessThan: 4700,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 1500,
//             lessThan: 3000,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 0,
//             lessThan: 1500,
//             point: 0
//         }
//     }
//     const protien = {
//         threePoint: {
//             greaterThan: 5,
//             lessThan: 1000000,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 3,
//             lessThan: 5,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 0,
//             lessThan: 3,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 0.0000001,
//             lessThan: 0,
//             point: 0
//         }
//     }
//     const goodSources = {
//         CA: {
//             Male: 1000,
//             Female: 1000
//         },
//         FE: {
//             Male: 8,
//             female: 18
//         },
//         K: {
//             Male: 3016,
//             Female: 2320
//         },
//         MG: {
//             Male: 400,
//             Female: 400
//         },
//         VITA_RAE: {
//             Male: 900,
//             Female: 700
//         },
//         VITC: {
//             Male: 90,
//             Female: 75
//         },
//         VITD: {
//             Male: 600,
//             Female: 600
//         },
//         THIA: {
//             Male: 1.2,
//             Female: 1.1
//         },
//         RIBF: {
//             Male: 1.3,
//             Female: 1.1
//         },
//         VITB6A: {
//             Male: 1.3,
//             Female: 1.3
//         },
//         TOCPHA: {
//             Male: 15,
//             Female: 15
//         },
//         VITB12: {
//             Male: 2.4,
//             Female: 2.4
//         }
//     }
//     const newUserType = {userType: 'HIGH_BP', totalCalories, macroNutrient, addedSugar, saturatedFat, transFat, sodium, carbDietaryFiber, potassium, protien, goodSources};
//     Usertype.create(newUserType);
// }

////////////////////////////////////////////////////////////////////////





///////////////////////////////highCholestrol///////////////////////////

// exports.createUserType = async (req, res) => {
//     const totalCalories = {
//         bmiLessThan25: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             twoPoint: {
//                 greaterThan: 10,
//                 lessThan: 15,
//                 point: 2
//             },
//             onePoint: {
//                 greaterThan: 15,
//                 lessThan: 20,
//                 point: 1
//             },
//             zeroPoint: {
//                 greaterThan: 20,
//                 lessThan: 30,
//                 point: 0
//             },
//             redPoint: {
//                 greaterThan: 30,
//                 lessThan: 1000000,
//                 point: 'red',
//             },
//         },
//         bmiMoreThan25: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             zeroPoint: {
//                 greaterThan: 10,
//                 lessThan: 20,
//                 point: 0
//             },
//             redPoint: {
//                 greaterThan: 20,
//                 lessThan: 1000000,
//                 point: 'red',
//             },
//         },
//     }
//     const macroNutrient = {
//         protien: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             onePoint: {
//                 greaterThan: 10,
//                 lessThan: 20,
//                 point: 1
//             },
//             zeroPoint: {
//                 greaterThan: 30,
//                 lessThan: 1000000,
//                 point: 0
//             },
//         },
//         carb: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             twoPoint: {
//                 greaterThan: 10,
//                 lessThan: 20,
//                 point: 2
//             },
//             onePoint: {
//                 greaterThan: 20,
//                 lessThan: 30,
//                 point: 1
//             },
//             redPoint: {
//                 greaterThan: 30,
//                 lessThan: 1000000,
//                 point: 'red',
//             },
//         },
//         fat: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             twoPoint: {
//                 greaterThan: 10,
//                 lessThan: 20,
//                 point: 2
//             },
//             onePoint: {
//                 greaterThan: 20,
//                 lessThan: 30,
//                 point: 1
//             },
//             redPoint: {
//                 greaterThan: 30,
//                 lessThan: 1000000,
//                 point: 'red',
//             },
//         }
//     }
//     const addedSugar = {
//         threePoint: {
//             greaterThan: 0,
//             lessThan: 1,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 1,
//             lessThan: 3,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 3,
//             lessThan: 5,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 5,
//             lessThan: 10,
//             point: 0
//         },
//         redPoint: {
//             greaterThan: 10,
//             lessThan: 1000000,
//             point: 'red'
//         }
//     }
//     const saturatedFat = {
//         threePoint: {
//             greaterThan: 0,
//             lessThan: 1,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 1,
//             lessThan: 3,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 3,
//             lessThan: 5,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 5,
//             lessThan: 10,
//             point: 0
//         },
//         redPoint: {
//             greaterThan: 10,
//             lessThan: 1000000,
//             point: 'red'
//         }
//     }
//     const transFat = {
//         threePoint: {
//             greaterThan: 0,
//             lessThan: 0,
//             point: 3
//         },
//         redPoint: {
//             greaterThan: 0.000001,
//             lessThan: 1000000,
//             point: 'red' 
//         }
//     }
//     const sodium = {
//         threePoint: {
//             greaterThan: 0,
//             lessThan: 400,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 400,
//             lessThan: 800,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 800,
//             lessThan: 1200,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 1200,
//             lessThan: 2400,
//             point: 0
//         },
//         redPoint: {
//             greaterThan: 2400,
//             lessThan: 1000000,
//             point: 'red'
//         }
//     }
//     const carbDietaryFiber = {
//         threePoint: {
//             greaterThan: 2,
//             lessThan: 1000000,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 1,
//             lessThan: 2,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 0,
//             lessThan: 1,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 0.000001,
//             lessThan: 0,
//             point: 0
//         }
//     }
//     const protien = {
//         threePoint: {
//             greaterThan: 5,
//             lessThan: 1000000,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 3,
//             lessThan: 5,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 0,
//             lessThan: 3,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 0,
//             lessThan: 0,
//             point: 0
//         }
//     }
//     const goodSources = {
//         CA: {
//             Male: 1000,
//             Female: 1000
//         },
//         FE: {
//             Male: 8,
//             female: 18
//         },
//         K: {
//             Male: 3016,
//             Female: 2320
//         },
//         MG: {
//             Male: 400,
//             Female: 400
//         },
//         VITA_RAE: {
//             Male: 900,
//             Female: 700
//         },
//         VITC: {
//             Male: 90,
//             Female: 75
//         },
//         VITD: {
//             Male: 600,
//             Female: 600
//         },
//         THIA: {
//             Male: 1.2,
//             Female: 1.1
//         },
//         RIBF: {
//             Male: 1.3,
//             Female: 1.1
//         },
//         VITB6A: {
//             Male: 1.3,
//             Female: 1.3
//         },
//         TOCPHA: {
//             Male: 15,
//             Female: 15
//         },
//         VITB12: {
//             Male: 2.4,
//             Female: 2.4
//         }
//     }
//     const newUserType = {userType: 'HIGH_CHOLESTROL', totalCalories, macroNutrient, addedSugar, saturatedFat, transFat, sodium, carbDietaryFiber, protien, goodSources};
//     Usertype.create(newUserType);
// }

////////////////////////////////////////////////////////////////////////





////////////////////////////////highSugar////////////////////////////////

// exports.createUserType = async (req, res) => {
//     const totalCalories = {
//         bmiLessThan25: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             twoPoint: {
//                 greaterThan: 10,
//                 lessThan: 15,
//                 point: 2
//             },
//             onePoint: {
//                 greaterThan: 15,
//                 lessThan: 20,
//                 point: 1
//             },
//             zeroPoint: {
//                 greaterThan: 20,
//                 lessThan: 30,
//                 point: 0
//             },
//             redPoint: {
//                 greaterThan: 30,
//                 lessThan: 100,
//                 point: 'red',
//             },
//         },
//         bmiMoreThan25: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             zeroPoint: {
//                 greaterThan: 10,
//                 lessThan: 20,
//                 point: 0
//             },
//             redPoint: {
//                 greaterThan: 20,
//                 lessThan: 100,
//                 point: 'red',
//             },
//         }
//     }
//     const macroNutrient = {
//         protien: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             onePoint: {
//                 greaterThan: 10,
//                 lessThan: 20,
//                 point: 1
//             },
//             zeroPoint: {
//                 greaterThan: 30,
//                 lessThan: 100,
//                 point: 0
//             },
//         },
//         carb: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             zeroPoint: {
//                 greaterThan: 10,
//                 lessThan: 20,
//                 point: 0
//             },
//             redPoint: {
//                 greaterThan: 20,
//                 lessThan: 100,
//                 point: 'red',
//             },
//         },
//         fat: {
//             threePoint: {
//                 greaterThan: 0,
//                 lessThan: 10,
//                 point: 3
//             },
//             twoPoint: {
//                 greaterThan: 10,
//                 lessThan: 20,
//                 point: 2
//             },
//             onePoint: {
//                 greaterThan: 20,
//                 lessThan: 30,
//                 point: 1
//             },
//             redPoint: {
//                 greaterThan: 30,
//                 lessThan: 100,
//                 point: 'red',
//             },
//         }
//     }
//     const addedSugar = {
//         threePoint: {
//             greaterThan: 0,
//             lessThan: 1,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 1,
//             lessThan: 3,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 3,
//             lessThan: 5,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 5,
//             lessThan: 10,
//             point: 0
//         },
//         redPoint: {
//             greaterThan: 10,
//             lessThan: 1000000,
//             point: 'red'
//         }
//     }
//     const saturatedFat = {
//         threePoint: {
//             greaterThan: 0,
//             lessThan: 1,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 1,
//             lessThan: 3,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 3,
//             lessThan: 5,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 5,
//             lessThan: 10,
//             point: 0
//         },
//         redPoint: {
//             greaterThan: 10,
//             lessThan: 1000000,
//             point: 'red'
//         }
//     }
//     const transFat = {
//         threePoint: {
//             greaterThan: 0,
//             lessThan: 0,
//             point: 3
//         },
//         redPoint: {
//             greaterThan: 0.000001,
//             lessThan: 1000000,
//             point: 'red' 
//         }
//     }
//     const sodium = {
//         threePoint: {
//             greaterThan: 0,
//             lessThan: 400,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 400,
//             lessThan: 800,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 800,
//             lessThan: 1200,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 1200,
//             lessThan: 2400,
//             point: 0
//         },
//         redPoint: {
//             greaterThan: 2400,
//             lessThan: 1000000,
//             point: 'red'
//         }
//     }
//     const carbDietaryFiber = {
//         threePoint: {
//             greaterThan: 2,
//             lessThan: 1000000,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 1,
//             lessThan: 2,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 0,
//             lessThan: 1,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 0,
//             lessThan: 0,
//             point: 0
//         }
//     }
//     const protien = {
//         threePoint: {
//             greaterThan: 5,
//             lessThan: 1000000,
//             point: 3
//         },
//         twoPoint: {
//             greaterThan: 3,
//             lessThan: 5,
//             point: 2
//         },
//         onePoint: {
//             greaterThan: 0,
//             lessThan: 3,
//             point: 1
//         },
//         zeroPoint: {
//             greaterThan: 0.000001,
//             lessThan: 0,
//             point: 0
//         }
//     }
//     const goodSources = {
//         CA: {
//             Male: 1000,
//             Female: 1000
//         },
//         FE: {
//             Male: 8,
//             female: 18
//         },
//         K: {
//             Male: 3016,
//             Female: 2320
//         },
//         MG: {
//             Male: 400,
//             Female: 400
//         },
//         VITA_RAE: {
//             Male: 900,
//             Female: 700
//         },
//         VITC: {
//             Male: 90,
//             Female: 75
//         },
//         VITD: {
//             Male: 600,
//             Female: 600
//         },
//         THIA: {
//             Male: 1.2,
//             Female: 1.1
//         },
//         RIBF: {
//             Male: 1.3,
//             Female: 1.1
//         },
//         VITB6A: {
//             Male: 1.3,
//             Female: 1.3
//         },
//         TOCPHA: {
//             Male: 15,
//             Female: 15
//         },
//         VITB12: {
//             Male: 2.4,
//             Female: 2.4
//         }
//     }
//     const newUserType = {userType: 'HIGH_SUGAR', totalCalories, macroNutrient, addedSugar, saturatedFat, transFat, sodium, carbDietaryFiber, protien, goodSources};
//     Usertype.create(newUserType);
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////ATHLETE///////////////////////////////////////////////////////

exports.createUserType = async (req, res) => {
    const totalCalories = {
        athleteToalCalories: {
            threePoint: {
                greaterThan: 0,
                lessThan: 10,
                point: 3
            },
            twoPoint: {
                greaterThan: 10,
                lessThan: 15,
                point: 2
            },
            onePoint: {
                greaterThan: 15,
                lessThan: 20,
                point: 1
            },
            zeroPoint: {
                greaterThan: 20,
                lessThan: 30,
                point: 0
            },
            redPoint: {
                greaterThan: 30,
                lessThan: 100,
                point: 'red',
            },
        }
    }
    const macroNutrient = {
        protien: {
            threePoint: {
                greaterThan: 0,
                lessThan: 10,
                point: 3
            },
            onePoint: {
                greaterThan: 10,
                lessThan: 20,
                point: 1
            },
            zeroPoint: {
                greaterThan: 30,
                lessThan: 100,
                point: 0
            },
        },
        carb: {
            threePoint: {
                greaterThan: 0,
                lessThan: 10,
                point: 3
            },
            onePoint: {
                greaterThan: 10,
                lessThan: 20,
                point: 1
            },
            zeroPoint: {
                greaterThan: 20,
                lessThan: 100,
                point: 0,
            },
        },
        fat: {
            threePoint: {
                greaterThan: 0,
                lessThan: 10,
                point: 3
            },
            twoPoint: {
                greaterThan: 10,
                lessThan: 20,
                point: 2
            },
            onePoint: {
                greaterThan: 20,
                lessThan: 30,
                point: 1
            },
            zeroPoint: {
                greaterThan: 30,
                lessThan: 100,
                point: 0,
            },
        }
    }
    const addedSugar = {
        threePoint: {
            greaterThan: 0,
            lessThan: 1,
            point: 3
        },
        twoPoint: {
            greaterThan: 1,
            lessThan: 3,
            point: 2
        },
        onePoint: {
            greaterThan: 3,
            lessThan: 5,
            point: 1
        },
        zeroPoint: {
            greaterThan: 5,
            lessThan: 10,
            point: 0
        },
        redPoint: {
            greaterThan: 10,
            lessThan: 1000000,
            point: 'red'
        }
    }
    const saturatedFat = {
        threePoint: {
            greaterThan: 0,
            lessThan: 1,
            point: 3
        },
        twoPoint: {
            greaterThan: 1,
            lessThan: 3,
            point: 2
        },
        onePoint: {
            greaterThan: 3,
            lessThan: 5,
            point: 1
        },
        zeroPoint: {
            greaterThan: 5,
            lessThan: 10,
            point: 0
        },
        redPoint: {
            greaterThan: 10,
            lessThan: 1000000,
            point: 'red'
        }
    }
    const transFat = {
        threePoint: {
            greaterThan: 0,
            lessThan: 0,
            point: 3
        },
        redPoint: {
            greaterThan: 0,
            lessThan: 1000000,
            point: 'red' 
        }
    }
    const sodium = {
        threePoint: {
            greaterThan: 0,
            lessThan: 400,
            point: 3
        },
        twoPoint: {
            greaterThan: 400,
            lessThan: 800,
            point: 2
        },
        onePoint: {
            greaterThan: 800,
            lessThan: 1200,
            point: 1
        },
        zeroPoint: {
            greaterThan: 1200,
            lessThan: 2400,
            point: 0
        },
        redPoint: {
            greaterThan: 2400,
            lessThan: 1000000,
            point: 'red'
        }
    }
    const carbDietaryFiber = {
        threePoint: {
            greaterThan: 2,
            lessThan: 1000000,
            point: 3
        },
        twoPoint: {
            greaterThan: 1,
            lessThan: 2,
            point: 2
        },
        onePoint: {
            greaterThan: 0,
            lessThan: 1,
            point: 1
        },
        zeroPoint: {
            greaterThan: 0,
            lessThan: 0,
            point: 0
        }
    }
    const protien = {
        threePoint: {
            greaterThan: 0.5,
            lessThan: 1000000,
            point: 3
        },
        twoPoint: {
            greaterThan: 0.4,
            lessThan: 0.5,
            point: 2
        },
        onePoint: {
            greaterThan: 0.3,
            lessThan: 0.4,
            point: 1
        },
        zeroPoint: {
            greaterThan: 0,
            lessThan: 0.3,
            point: 0
        }
    }
    const carbs = {
        male: {
            threePoint: {
                greaterThan: 3.5,
                lessThan: 100000,
                point: 3
            },
            twoPoint: {
                greaterThan: 3,
                lessThan: 3.5,
                point: 2
            },
            onePoint: {
                greaterThan: 2.5,
                lessThan: 3,
                point: 1
            },
            zeroPoint: {
                greaterThan: 0,
                lessThan: 2.5,
                point: 0
            }
        },
        female: {
            threePoint: {
                greaterThan: 3,
                lessThan: 100000,
                point: 3
            },
            twoPoint: {
                greaterThan: 2.5,
                lessThan: 3,
                point: 2
            },
            onePoint: {
                greaterThan: 2,
                lessThan: 2.5,
                point: 1
            },
            zeroPoint: {
                greaterThan: 0,
                lessThan: 2,
                point: 0
            }
        }
    }
    const goodSources = {
        CA: {
            Male: 1000,
            Female: 1000
        },
        FE: {
            Male: 8,
            female: 18
        },
        K: {
            Male: 3016,
            Female: 2320
        },
        MG: {
            Male: 400,
            Female: 400
        },
        VITA_RAE: {
            Male: 900,
            Female: 700
        },
        VITC: {
            Male: 90,
            Female: 75
        },
        VITD: {
            Male: 600,
            Female: 600
        },
        THIA: {
            Male: 1.2,
            Female: 1.1
        },
        RIBF: {
            Male: 1.3,
            Female: 1.1
        },
        VITB6A: {
            Male: 1.3,
            Female: 1.3
        },
        TOCPHA: {
            Male: 15,
            Female: 15
        },
        VITB12: {
            Male: 2.4,
            Female: 2.4
        }
    }
    const newUserType = {userType: 'ATHLETE', totalCalories, macroNutrient, addedSugar, saturatedFat, transFat, sodium, carbDietaryFiber, protien, carbs, goodSources};
    Usertype.create(newUserType);
}