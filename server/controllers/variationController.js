const Variation = require('../models/variatonModel');  // Import the Variation model

// Create a new variation
exports.createVariation = async (req, res) => {
  try {
    const { name, options } = req.body;

    const newVariation = new Variation({
      name,
      options,
    });

    await newVariation.save();
    res.status(201).json({ message: 'Variation created successfully', newVariation });
  } catch (error) {
    res.status(500).json({ message: 'Error creating variation', error });
  }
};

// Get all variations
exports.getAllVariations = async (req, res) => {
  try {
    const variations = await Variation.find();
    res.status(200).json(variations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving variations', error });
  }
};

// Get a single variation by ID
exports.getVariationById = async (req, res) => {
  try {
    const variation = await Variation.findById(req.params.id);
    if (!variation) {
      return res.status(404).json({ message: 'Variation not found' });
    }
    res.status(200).json(variation);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving variation', error });
  }
};

// Update a variation by ID
exports.updateVariation = async (req, res) => {
  try {
    const updatedVariation = await Variation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedVariation) {
      return res.status(404).json({ message: 'Variation not found' });
    }
    res.status(200).json({ message: 'Variation updated successfully', updatedVariation });
  } catch (error) {
    res.status(500).json({ message: 'Error updating variation', error });
  }
};

// Delete a variation by ID
exports.deleteVariation = async (req, res) => {
  try {
    const variation = await Variation.findByIdAndDelete(req.params.id);
    if (!variation) {
      return res.status(404).json({ message: 'Variation not found' });
    }
    res.status(200).json({ message: 'Variation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting variation', error });
  }
};
