const Package = require('../models/packagesModel'); 
const path = require('path');
const fs = require('fs');

// Create a new package
exports.createPackage = async (req, res) => {
  try {
    const { name, description, price, variation } = req.body;
    let image = null;

    // Check if an image is uploaded
      if (req.file) {
      image = req.file.filename;  // The filename of the uploaded image
    }

    // Create a new package object
    const newPackage = new Package({
      name,
      description,
      price,
      image,
      variation
    });

    // Save the new package to the database
    await newPackage.save();
    res.status(201).json({ message: 'Package created successfully', package: newPackage });
  } catch (error) {
    res.status(500).json({ message: 'Error creating package', error });
  }
};

// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find().populate('variation');
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages', error });
  }
};

// Get a single package by ID
exports.getPackageById = async (req, res) => {
  const { id } = req.params;

  try {
    const package = await Package.findById(id).populate('variation');
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json(package);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the package', error });
  }
};

// Update a package by ID
exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, variation } = req.body;
    
    // Find existing package
    const existingPackage = await Package.findById(id);
    if (!existingPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Update package data
    const updateData = {
      name,
      description,
      price,
      variation
    };

    // Only update image if a new one is uploaded
    if (req.file) {
      // Delete old image if it exists
      if (existingPackage.image) {
        const oldImagePath = path.join(__dirname, '../uploads', existingPackage.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image = req.file.filename;
    }

    // Update the package
    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error('Update package error:', error);
    res.status(500).json({ message: 'Error updating package', error: error.message });
  }
};

// Delete a package by ID
exports.deletePackage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPackage = await Package.findByIdAndDelete(id);

    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Delete the associated image from the filesystem (if it exists)
    if (deletedPackage.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', deletedPackage.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting image:', err);
      });
    }

    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting package', error });
  }
};
