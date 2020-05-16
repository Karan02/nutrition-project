const Restaurant = require('../../model/restaurant.model');
const randomString = require('random-string');

const {findRestaurant,updateRestaurant} = require("../helper/db-queries")
const {handleEdit} = require("../helper/bank-details")
/*
  @Input: Restaurant Id
  @params
  @Output: Restaurant Object with Bank Details
*/
exports.addBankAccount = async (req, res) => {
  const ownerId = req.params.restaurantId;


  if(!req.body.isEdit) return await handleEdit(req,res,ownerId)

  delete req.body.isEdit;
  const bankId = req.query.bankId;
 
  const updatedDetails = await updateRestaurant({_id: ownerId, "bankDetails._id": bankId}, {$set: {
    "bankDetails.$.accountNumber": req.body.accountNumber,
    "bankDetails.$.ifscCode": req.body.ifscCode,
    "bankDetails.$.bankName": req.body.bankName,
    "bankDetails.$.paypalId": req.body.paypalId,
  }});

  res.json({
    status: true,
    data: updatedDetails
  })
}  

/*
  @Input: Restaurant Id
  @params
  @Ouput: List of Bank Details
*/
exports.getAllDetails = async (req, res) => {
  const id = req.params.restaurantId;

  const details = await findRestaurant({_id: id});
  
  const condition = details.length ? details[0].bankDetails.length < 1:true
  
  if(condition) {
    return res.json({
      status: false,
      message: 'No bank details available'
    });
  }

  const filteredDetails = details[0].bankDetails.filter(bank => {
    return bank.isDeleted === false;
  });

  res.json({
    status: true,
    data: filteredDetails
  })

}

/*
  @Input: Bank Id and Restaurant Id
  @params
  @Output: Restaurant Object with Bank detaile marked deleted
*/
exports.deleteBankDetails = async (req, res) => {
  const restaurantId = req.body.restaurantId; 
  const bankId = req.body.bankId; 
  
  await updateRestaurant({_id: restaurantId, "bankDetails._id": bankId}, {$set: {"bankDetails.$.isDeleted": true}});

  res.json({
    status: true,
    message: 'Bank Detail Deleted'
  })
}