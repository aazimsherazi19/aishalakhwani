const mongoose = require('mongoose');

const buySchema = new mongoose.Schema({
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
});

const Buy = mongoose.model('Buy', buySchema);

module.exports = Buy;