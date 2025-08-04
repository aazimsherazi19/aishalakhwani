const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pastPatientHistory: { type: String, required: false }, // Optional
  },
  packages: [
    {
      package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
      },
     variation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variation',
        required: false,
      },
      selectedOption: {
        optionId: mongoose.Schema.Types.ObjectId,
        name: String,
        price: Number
      },
      price: { type: Number, required: true }, // Price of the product with variation applied
    }
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'shipped', 'cancelled'],
    default: 'pending'
  },
  orderDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
