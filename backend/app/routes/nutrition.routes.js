// const restaurant = require('../controller/restaurant-controller/restaurant.controller');
// const login = require('../controller/restaurant-controller/login-controller');
const meal = require('../controller/restaurant-controller/meal.controller');
const bankDetails = require('../controller/restaurant-controller/bankDetails.controller');
const customer = require('../controller/customer/customer');
const customerMeal = require('../controller/customer/meals');
const userType = require('../controller/customer/usertype');
const macroNutrientDistribution = require('../controller/customer/recommendedMacroNutrient');
const restaurant = require('../controller/restaurant-controller/restaurant.controller');
const login = require('../controller/restaurant-controller/login-controller');
// const meal = require('../controller/meal.controller');
// const bankDetails = require('../controller/bankDetails.controller');
const jwt = require('jsonwebtoken');
const ingredients = require('../controller/admin-controller/ingredients.controller');
const foodGroup = require('../controller/admin-controller/food-group.controller');
const foodType = require('../controller/admin-controller/food-type.controller');
// const changePassword = require('../controller/restaurant-controller/changePassword.controller');
// const importExport = require('../controller/restaurant-controller/importExport.controller');
// const nutritionContent = require('../controller/restaurant-controller/nutritionContent.controller');
const changeCustomerPassword = require('../controller/customer/changePassword');
const nutriDoc = require('../controller/customer/nutriDoc');
const changePassword = require('../controller/changePassword.controller');
const importExport = require('../controller/importExport.controller');
const nutritionContent = require('../controller/nutritionContent.controller');
const MealCategory = require("../controller/admin-controller/meal-category.controller");
const cuisine = require("../controller/admin-controller/cuisine.controller");

const multer = require('multer');
// const fileupload = multer({ dest: `uploads/` });

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images')
  },
  filename(req, file, callback) {
    const type = file.mimetype.split('/')[1];
    callback(null, `${file.fieldname}_${Date.now()}.${type}`)
  },
});

const fileStorage = multer.diskStorage({
  destination(req, file, callback) {
 
    callback(null, './uploads')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}.csv`)
  },
});

const upload = multer({storage: storage, limits: {fieldSize: 1*1000*1000*1000}});
const csvUpload = multer({storage: fileStorage, limits: {fieldSize: 1*1000*1000*1000}});

const isAdmin = (req, res, next) => {

  if(req.body.role === 'admin') {
    next();
  }
  else {
    res.json({
      status: false,
      message: 'Invalid User'
    });
  }
}

const verifyUser = (req, res, next) => {
  const token = req.headers['authorization'];
  
  
  if(req.body.role === 'admin') {
    jwt.verify(token, process.env.ADMIN_SECRET_KEY, err => {
      
      
      if(err) {
        console.log("err",err)
        res.json({
          status: false,
          message: 'Invalid Token'
        });
      }
      next();
    });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, err => {
      if(err) {
        res.json({
          status: false,
          message: 'Invalid Token'
        });
      }
      next();
    })
  }

}

module.exports = (app) => {
  
  //Restaurant APIs

  app.post('/register', restaurant.create);

  app.post('/login', login.restaurantLogin);

  app.post('/restaurant/submitmeal',meal.createMeal);

  app.post('/change-password/:restaurantID', verifyUser, changePassword.updatedPassword );

  app.put('/restaurant/bank-details/:restaurantId',verifyUser ,bankDetails.addBankAccount);

  app.put('/restaurant/delete-bank-detail', verifyUser,bankDetails.deleteBankDetails);

  app.put('/restaurant/meal/:mealId', verifyUser ,meal.deleteMeal);

  app.get('/restaurants', restaurant.getRestaurant);

  app.get('/restaurents/:id', restaurant.getRestaurantById);

  // app.get('/restaurant/meals/:restaurantId' ,restaurant.getAllMeals);

  app.get('/restaurant/meals', meal.getAllMeals);

  app.get('/restaurant/mealSearch',meal.getSpecificMeal);

  app.get('/restaurant/ingredientsSearch',ingredients.getSpecificIngredients);

  app.get('/meal/restaurant/:id', meal.getResturantOfMeal);
  
  app.post('/meal-ingredients',meal.getMealIngredients);

  app.post('/restaurant/bank-details/:restaurantId', verifyUser,bankDetails.getAllDetails);

  app.post('/import-meal',csvUpload.single('file'),importExport.import)

  app.post('/export-meal/:restaurantId',importExport.export)

  app.post('/nutrient-content/:mealID', nutritionContent.getNutritionContent);

  app.get('/download-sample-meal',importExport.sample)

  app.get('/download-sample-ingredient',importExport.sampleIngredient)

  app.post('/import-ingredients',importExport.importIngredient)

  app.post('/export-ingredient/:restaurantId',importExport.exportIngredient)

  //Admin Routes
  
  app.post('/ingredients/create', ingredients.create);

  app.post('/foodGroup/create', isAdmin, verifyUser, foodGroup.create);

  app.post('/cuisine/create', isAdmin, verifyUser, cuisine.create);

  app.post('/food-type/create', isAdmin, verifyUser, foodType.create);

  app.post('/meal-category/create', isAdmin, verifyUser, MealCategory.create);

  app.put('/ingredients/delete-ingredient', ingredients.deleteIngredient);

  app.put('/foodGroup/delete-food-group', isAdmin, verifyUser, foodGroup.deleteFoodGroup);

  app.put('/cuisine/delete-cuisine', isAdmin, verifyUser, cuisine.deleteCuisine);

  app.put('/mealCategory/delete-meal-category', isAdmin, verifyUser, MealCategory.deleteMealCategory);

  app.put('/food-type/delete-food-type', isAdmin, verifyUser, foodType.deleteFoodType);

  app.post('/ingredients', ingredients.getAllIngredients);

  app.post('/food-groups', foodGroup.getAllFoodGroup);

  app.post('/food-types', foodType.getAllFoodType);

  app.post('/restaurant/meals', meal.getAllMeals);

  app.post('/cuisine', cuisine.getAllCuisine);

  app.post('/meal-category', MealCategory.getAllMealCategory);

  app.post('/food-types', foodType.getAllFoodType);

  app.post('/restaurant/meals', meal.getAllMeals);

  //Customer APIs

  app.post('/customer-register', customer.register);

  app.post('/customer-login', customer.login)

  app.get('/get-customer/:id', customer.getCustomerById);

  app.get('/customer-email/:email', customer.getCustomerByEmail);

  app.put('/edit-customer/:id', upload.single('profilePicture'), customer.editCustomerDetails);

  app.get('/all-meals', customerMeal.getAllMeals);

  app.put('/order-meal', customerMeal.orderMeal);

  app.get('/new-user-type', userType.createUserType);

  app.get('/macro-nutrient-distribution', macroNutrientDistribution.createMacroNutrientDistribution);
  
  app.put('/change-password', changeCustomerPassword.changePassword);

  app.get('/nutri-doc', nutriDoc.nutriDocData)

}



