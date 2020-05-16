const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Restaurant = require('../../model/restaurant.model');

/*
  @Input: Login Credentials
  @params
  @Output: Access Token
*/
exports.restaurantLogin = async (req, res) => {
 
  if(!req.body.email || !req.body.password) {
    return res.json({
      status: false,
      message: 'Enter All Fields'
    });
  }

  req.body.email = req.body.email.toLowerCase().trim();
  const restaurant = await Restaurant.find({email: req.body.email});

  if(restaurant.length < 1) {
    return res.json({
      status: false,
      message: 'Restaurant does not exist'
    });
  }

  bcrypt.compare(req.body.password, restaurant[0].password, (err, response) => {
    if(!response) {
      return res.json({
        status: false,
        message: "Invalid Password"
      });
    }

    if(restaurant[0].role === 'admin') {
      const token = jwt.sign({email: restaurant[0].email}, process.env.ADMIN_SECRET_KEY, {expiresIn: '24h'})
      return res.json({
        status: true,
        token: token,
        role:'admin',
        data: {id: restaurant[0]._id}
      })
    }
    
    const token = jwt.sign({email: restaurant[0].email}, process.env.SECRET_KEY,{expiresIn: '24h'});
    res.json({
      status: true,
      token: token,
      data: {id: restaurant[0]._id, isLoggedIn: restaurant[0].isLoggedIn}
    })
  })
}