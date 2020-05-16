const Customer = require('../../model/customer.model');
const Restaurant = require('../../model/restaurant.model');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const {checkCustomerExistence} = require('../helper/checkCustomerExistence');
const mongoose = require('mongoose');
/** 
    Input: 
        "body": {
            "email": String, 
            "password": String
        }
    Output: 
        "data": {
            "allergies": Array,
            "dietaryNeeds": Array,
            "breakfast": Array,
            "lunch": Array,
            "dinner": Array,
            "_id": ObjectId,
            "email": String,
            "role": "customer",
            "__v": 0
        },
        "message": Boolean
**/
exports.register = async (req, res) => {
  try{
    req.body.email = req.body.email.toLowerCase().trim();

    if(await checkCustomerExistence(req.body.email)) {
      res.json({
        status: false,
        message: 'Customer already exists',
      });
    }
      
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    req.body.role = 'customer';
    const customer = await Customer.create(req.body);
    customer.password = undefined;
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASSWORD
      }
    })
  
    const mailOptions = {
          from: process.env.GMAIL_ID,
          to: req.body.email,
          subject: 'Welcome to Nutrition',
      html: `
        <body>
          <p> Hello ${req.body.name} </p>
          <br/>
          <p>Thank you for signin up to Nutrition Startup. Kindly use given credentials for login in.</p>
          <br/>
          <p>Email Id: ${req.body.email} </p>
          <br/>
          <br/>
          <p>Thank You!</p>
          <p>Nutrition Team</p>
        </body>
          `
      }
  
      // transporter.sendMail(mailOptions, (err, info)=>{
      //     if(err){
      //         console.log('error occured',err);
      //         return;
      //     }
      //     console.log('mail sent');
      // })
  
    res.json({
      data: customer,
      message: true
    })
  } catch (error) {
    console.log('error', error);
  }
}

/** 
    Input: 
        "body": {
            "email": String, 
            "password": String
        }
    Output: 
        "status": Boolean,
        "token": String,
        "data": {
            "id": ObjectId
        }
**/
exports.login = async (req, res) => {
  try {
    if(!req.body.email || !req.body.password) {
      return res.json({
        status: false,
        message: 'Enter All Fields'
      });
    }
  
    req.body.email = req.body.email.toLowerCase().trim();
    let customer = await checkCustomerExistence(req.body.email);
    console.log(customer);
    if(!customer) {
      res.json({
        status: false,
        message: 'Customer does not exists',
      });
    }

    bcrypt.compare(req.body.password, customer[0].password, (err, response) => {
      if(!response) {
        return res.json({
          status: false,
          message: "Invalid Password"
        });
      }
  
      let secretKey = 'SECRETKEY';
      const token = jwt.sign({email: customer[0].email}, secretKey,{expiresIn: '24h'});
      res.json({
        status: true,
        token: token,
        data: {id: customer[0]._id, fName: customer[0].fName, lName: customer[0].lName, email: customer[0].email}
      })
    })
  } catch(error) {
    console.log('error', error);
  }
}

exports.getCustomerById = async (req, res) => {
  console.log(req.params);
    const customer = await Customer.findById(req.params.id)
    .catch((error) => {
      res.json({
        status: false,
        message: 'User not found'
      });
    })

    if(!customer) {
      return res.json({
        status: false
      });
    }

    else {
        delete customer.password;
        res.json({
            data: customer,
            status: true
        });
    }
}

exports.getCustomerByEmail = async (req, res) => {
    const customer = await Customer.findOne({email: req.params.email})
    .catch(error => {
        res.json({
            status: false,
            message: 'User not found',
        });
    });

    if(!customer) {
        res.json({
            status: false,
            message: 'User not found',
        });
    }

    else {
        delete customer.password;
        res.json({
            status: true,
            data: customer,
        })
    }
}

exports.editCustomerDetails = async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  const query = req.file ? 
  {$set: 
    {
      "fName": req.body.fName, 
      "lName": req.body.lName, 
      "email": req.body.email, 
      "profilePicture": `${req.file.filename}`
    }
  } : 
  {$set: 
    {
      "fName": req.body.fName, 
      "lName": req.body.lName, 
      "email": req.body.email
    }
  }
  const customer = await Customer.findOneAndUpdate(
    {_id: id},
    query, 
    {new: true}
  );
  res.json({
    status: true,
    data: customer,
  })
}
