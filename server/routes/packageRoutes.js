const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const packageController = require('../controllers/packagesController');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define the uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to avoid file name conflicts
  }
});

// Multer instance for handling file uploads
const upload = multer({ storage: storage });

// Route for creating a new package with image upload
router.post('/addpackage', upload.single('image'), packageController.createPackage);

// Route for getting all packages
router.get('/getpackages', packageController.getAllPackages);

// Route for fetching a single package by ID
router.get('/getonepackage/:id', packageController.getPackageById);

// Route for updating a package by ID with image upload
router.put('/updatepackage/:id', upload.single('image'), packageController.updatePackage);

// Route for deleting a package by ID
router.delete('/deletepackage/:id', packageController.deletePackage);

module.exports = router;
