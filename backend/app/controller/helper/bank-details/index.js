const {findRestaurant, updateRestaurant} = require("../db-queries")
const randomString = require('random-string');


/*
 @Input: Restaurant ID,bank details
 @params
 @Output: updated Bank details
*/
exports.handleEdit = async (req,res,ownerId) => {
  const checkDetails = await findRestaurant({_id: ownerId, "bankDetails.accountNumber":  req.body.accountNumber,"bankDetails.isDeleted": false });

  if(!req.body.isEdit) {

    if(checkDetails.length > 0 ) {
      return res.json({
        status: false,
        message: 'Account Number Already Exists'
      })
    }
    req.body._id = randomString({length: 14})
    req.body.isDeleted = false;

    const addBankDetails = await updateRestaurant({_id: ownerId}, {$push: {bankDetails: req.body}});
  
    return res.json({
      status: true,
      data: addBankDetails
    });
  }
}