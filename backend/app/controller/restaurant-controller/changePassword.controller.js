const bcrypt = require('bcrypt');
const Restaurant = require('../../model/restaurant.model');

exports.updatedPassword = async (req,res) => {
  const userId = req.body.userId;
  delete req.body.userId;

  const updatedPassword = bcrypt.hashSync(req.body.password, 10);
  await Restaurant.updateOne({_id: userId},{$set: {password: updatedPassword, isLoggedIn: true}});
  res.json({
    status: true,
    message: 'Password Successfully Changed!'
  });
};