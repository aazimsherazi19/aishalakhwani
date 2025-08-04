const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');  // Path to OrderController

// Create Order
router.post('/createorders', createOrder);

// Get All Orders
router.get('/allorders', getAllOrders);

// Get Order by ID
router.get('/oneorder/:id', getOrderById);

// Update Order by ID
router.put('/updateorder/:id', updateOrder);

// Delete Order by ID
router.delete('/deleteorders/:id', deleteOrder);

module.exports = router;
