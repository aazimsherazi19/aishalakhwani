const express = require('express');
const router = express.Router();
const {
  createBuy,
  getAllBuys,
  getBuyById
} = require('../controllers/buyController');  // Path to BuyController

// Create Buy
router.post('/createbuy', createBuy);

// Get All Buys
router.get('/allbuys', getAllBuys);

// Get Buy by ID
router.get('/onebuy/:id', getBuyById);




module.exports = router;
