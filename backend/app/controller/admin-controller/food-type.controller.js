const FoodType = require("../../model/food-type.model")
const {findFoodType,updateFoodType,createFoodType,findFoodGroup,findIngredients} = require("../helper/db-queries/index");
const mongoose = require('mongoose');

/*
 @Input: New Food Type data
 @params
 @Output: Current status 
*/
exports.create = async (req,res) => {

  const typeCheck = await findFoodType({name:req.body.name,isDeleted: false})
  const foodgroup = await findFoodGroup({name:req.body.group})
  if(typeCheck.length > 0){
    return res.json({
      status: false,
      message: "Food Type already exist"
    })
  }
  if(req.body.isEdit) {
    delete req.body.isEdit
    
    await updateFoodType({_id:req.body._id},{$set:{name:req.body.name,"group":foodgroup[0]._id}})

    return res.json({
      status: true,
      message: "Successfully Edited "
    })
  }
  

  if(req.body.name.match(/^[0-9]+$/)){
    return res.json ({
      status: false,
      message: "Invalid food type"
    })
  }
  req.body.isDeleted = false;
  delete req.body._id
  req.body.group = foodgroup[0]._id
  const foodtype = await createFoodType(req.body)
  
  res.json({
    status: true
  })
}


/*
 @Input: 
 @params
 @Output: All Food Types 
*/
exports.getAllFoodType = async (req,res) => {
  const foodtype = await findFoodType({isDeleted:false});
 let updatedfoodtype = []  
  for(let i =0;i<foodtype.length;i++){
    const type = foodtype[i]
 
    const groupname = await findFoodGroup({_id:type.group})
    type.group = groupname[0].name
    updatedfoodtype.push(type)
  
  }
  res.json({
    data: updatedfoodtype,
    status: true
  })
  }


/*
 @Input: Food Type ID
 @params
 @Output: Current status 
*/
exports.deleteFoodType = async (req,res) => {
  const ID = req.query.ID;
  const Ingredients = await findIngredients({foodType:new mongoose.Types.ObjectId(ID)})
  if(Ingredients.length > 0){
    res.json({
      status:false,
      message:"Food Type is Already in Use"
    })
    return
  }
  const foodType  = await updateFoodType({_id: ID },{$set: {isDeleted: true}});
  res.json({  
    status: true
  })
}