const mongoose = require('mongoose');

const variationSchema = new mongoose.Schema({
  name: {
    type: String, // e.g., 'Month'
    required: true,
  },
  options: [
    {
      name: {
        type: String, // e.g., '1 month', '2 months', '3 months'
        required: true,
    },
    description: {
      type: String, // Description of the option
      required: true,
    },
      price: {
        type: Number, // Price for this option
        required: true,
      },
    },
  ],
});

const Variation = mongoose.model('Variation', variationSchema);

module.exports = Variation;
