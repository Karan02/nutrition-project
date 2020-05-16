const FoodGroup = require("../../model/food-group.model");
const FoodType = require("../../model/food-type.model");
const {findFoodGroup,updateFoodGroup,createFoodGroup,updateFoodType,findFoodType} = require("../helper/db-queries/index");
const mongoose = require('mongoose');


/*
 @Input: New Food Group data
 @params
 @Output: Current status 
*/

exports.create = async (req,res) => {
  const groupID = req.body._id;
  delete req.body.role;
  delete req.body._id;
  const foodCheck = await findFoodGroup({name:req.body.name,isDeleted:false})
  
  if(foodCheck.length > 0){
    return res.json({
      status: false,
      message: "Food Group already exist"
    })
  }

  if(req.body.isEdit) {
    delete req.body.isEdit
    await updateFoodGroup({_id:groupID},{$set:{name:req.body.name}})
    return res.json({
      status: true,
      message: "Successfully edited "
    })
  }
  
  

  if(req.body.name.match(/^[0-9]+$/)){
    return res.json ({
      status: false,
      message: "Invalid Food Group"
    })
  }
  req.body.isDeleted = false;
  const foodgroup = await createFoodGroup(req.body)
  res.json({
    status: true
  })
}

/*
 @Input: 
 @params
 @Output: All Food Groups
*/

exports.getAllFoodGroup = async (req,res) => {
const foodgroup = await findFoodGroup({isDeleted:false});
res.json({
  data: foodgroup,
  status: true
})
}

/*
 @Input: Food Group ID
 @params
 @Output: Deletion status 
*/
exports.deleteFoodGroup = async (req,res) => {
  const groupID = req.query.groupID;
  const foodType = await findFoodType({'group': new mongoose.Types.ObjectId(groupID)})
  if(foodType.length > 0){
    res.json({
      status:false,
      message:"Food Group Already in Use"
    })
    return
  }
  const foodGroups  = await updateFoodGroup({_id: groupID },{$set: {isDeleted: true}});
  // const foodType = await updateFoodType({'group.groupID': groupID},{$set: {isDeleted: true}})
  res.json({  
    status: true
  })
}