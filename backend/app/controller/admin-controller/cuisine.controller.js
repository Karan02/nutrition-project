const Cuisine = require("../../model/cuisine.model");
const {findCuisines,updateCuisine,createCuisine} = require("../helper/db-queries/index");


/*
 @Input: New Cuisine data
 @params
 @Output: Current status 
*/
exports.create = async (req,res) => {
  const cuisineID = req.body._id;
  delete req.body.role;
  delete req.body._id;
  const cuisineCheck = await findCuisines({name:req.body.name,isDeleted:false})
  if(req.body.isEdit) {
    delete req.body.isEdit
    await updateCuisine({_id:cuisineID},{$set:{name:req.body.name}})
    return res.json({
      status: true,
      message: "Successfully edited "
    })
  }
  if(cuisineCheck.length > 0){
    return res.json({
      status: false,
      message: "Cuisine already exist"
    })
  }
  if(req.body.name.match(/^[0-9]+$/)){
    return res.json ({
      status: false,
      message: "Invalid Cuisine Name"
    })
  }
  req.body.isDeleted = false;
  const cuisine = await createCuisine(req.body)
  res.json({
    status: true
  })
}

/*
 @Input: 
 @params
 @Output: All cuisines
*/
exports.getAllCuisine = async (req,res) => { 
const cuisine = await findCuisines({isDeleted:false});
res.json({
  data: cuisine,
  status: true
})
}

/*
 @Input: Cuisine ID
 @params
 @Output: Status
*/
exports.deleteCuisine = async (req,res) => {
  const cuisineID = req.query.cuisineID;
  const cuisine  = await updateCuisine({_id: cuisineID },{$set: {isDeleted: true}});
  res.json({  
    status: true
  })
}