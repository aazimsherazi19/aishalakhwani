const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  image: {
    type: String, // URL or file path for the image
    required: false, // Image is optional
  },
  variation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Variation',
    required: false, // Variation is optional
  },
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
