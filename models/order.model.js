const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerInfo: {
    fullName: String,
    email: String,
    address: String,
  },
  items: [{
    carId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
  }],
  paymentMethod: String,
 
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;