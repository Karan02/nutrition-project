const Customer = require('../../model/customer.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


exports.changePassword = async (req, res) => {

    const customer = await Customer.findOne({_id: new mongoose.Types.ObjectId(req.body.userId)});

    if(!customer) {
        res.json({
            status: false,
            message: 'User not found',
        });
    }
    else {
        bcrypt.compare(req.body.oldPassword, customer.password, async (err, response) => {
            if(!response) {
                res.json({
                    status: false,
                    message: 'Invalid password',
                })
            }
            else {
                const password = bcrypt.hashSync(req.body.newPassword, 10);
                const c = await Customer.updateOne({_id: new mongoose.Types.ObjectId(req.body.userId)}, {$set: {password: password}});
                res.json({
                    status: true,
                    message: 'Password changed',
                })
            }
        })
    }
}