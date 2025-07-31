const express = require('express');
const router = express.Router();
const variationController = require('../controllers/variationController');

// Route to create a new variation
router.post('/createvariation', variationController.createVariation);

// Route to get all variations
router.get('/getallvariations', variationController.getAllVariations);

// Route to get a variation by ID
router.get('/getonevariation/:id', variationController.getVariationById);

// Route to update a variation by ID
router.put('/updatevariation/:id', variationController.updateVariation);

// Route to delete a variation by ID
router.delete('/deletevariation/:id', variationController.deleteVariation);

module.exports = router;
