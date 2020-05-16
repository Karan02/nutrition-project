import Customer from '../../model/customer.model';
import Restaurant from '../../model/restaurant.model';

exports.checkCustomerExistence = async email => {
    let customerCheck = await Customer.find({email: email});

    if(customerCheck.length === 0) {
      customerCheck = await Restaurant.find({email: email});
    }
    if(customerCheck.length > 0) {
      return customerCheck;
    }
    return false
}
