
const MealCategory = require("../../model/meal-category.model");
const {findMealCategories,updateMealCategories,createMealCategory,findMealCategoriesLimited}  = require("../helper/db-queries")


/*
 @Input: New Meal Category Data
 @params
 @Output: Current status 
*/
exports.create = async (req,res) => {
  const categoryID = req.body._id;
  delete req.body.role;
  delete req.body._id;
  const mealCheck = await findMealCategories({name:req.body.name,isDeleted:false})
 
  if(req.body.isEdit) {
    delete req.body.isEdit
    await updateMealCategories({_id:categoryID},{$set:{name:req.body.name}})
    return res.json({
      status: true,
      message: "Successfully edited "
    })
  }

  if(mealCheck.length > 0){
    return res.json({
      status: false,
      message: "Meal Category already exist"
    })
  }

  if(req.body.name.match(/^[0-9]+$/)){
    return res.json ({
      status: false,
      message: "Invalid Meal Category"
    })
  }
  req.body.isDeleted = false;
  const mealcategory = await createMealCategory(req.body)
  res.json({
    status: true
  })
}

/*
 @Input: 
 @params
 @Output: All meal categories
*/
exports.getAllMealCategory = async (req,res) => {
const mealcategory = await findMealCategoriesLimited(parseInt(req.query.offset));

const totalCategories = parseInt(mealcategory[1].length > 0 ? mealcategory[1][0].count:0)

res.json({
  data: mealcategory[0],
  status: true,
  totalCategories
})
}

/*
 @Input: Category ID
 @params
 @Output: Status of deletion 
*/
exports.deleteMealCategory = async (req,res) => {
  const categoryID = req.query.categoryID;
  
  
  
  const mealCategories  = await updateMealCategories({_id: categoryID },{$set: {isDeleted: true}});
  
  res.json({  
    status: true
  })
}