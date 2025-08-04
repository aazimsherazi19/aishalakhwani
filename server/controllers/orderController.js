const Order = require('../models/orderModel');
const Package = require('../models/packagesModel');
const Variation = require('../models/variatonModel');

// ...existing code...

const createOrder = async (req, res) => {
  const { customer, packages } = req.body;

  try {
    let totalAmount = 0;
    const packageDetails = [];

    for (const package of packages) {
      const { packageId, variationId, variationOptionId } = package;

      const pkg = await Package.findById(packageId).populate('variation');
      let price = pkg.price;

      if (pkg.variation && variationId) {
        const variation = await Variation.findById(variationId);
        const selectedOption = variation.options.find(
          option => option._id.toString() === variationOptionId
        );

        if (selectedOption) {
          price = selectedOption.price;
          packageDetails.push({
            package: pkg._id,
            variation: variation._id,
            selectedOption: {
              _id: selectedOption._id,
              name: selectedOption.name,
              price: selectedOption.price
            },
            price: selectedOption.price
          });
        }
      } else {
        packageDetails.push({
          package: pkg._id,
          variation: null,
          selectedOption: null,
          price
        });
      }

      totalAmount += price;
    }

    const order = new Order({
      customer,
      packages: packageDetails,
      totalAmount
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: 'packages.package',
        select: 'name'
      })
      .populate({
        path: 'packages.variation',
        select: 'name options'
      });

    const transformedOrders = orders.map(order => {
      const orderObj = order.toObject();
      orderObj.packages = orderObj.packages.map(pkg => {
        let selectedOptionName = 'No variation';
        
        // Check for selectedOption from the stored data
        if (pkg.selectedOption && pkg.selectedOption.name) {
          selectedOptionName = pkg.selectedOption.name;
        }
        // If no selectedOption, try to find from variation
        else if (pkg.variation && pkg.variationOption) {
          const matchingOption = pkg.variation.options.find(
            opt => opt._id.toString() === pkg.variationOption.toString()
          );
          if (matchingOption) {
            selectedOptionName = matchingOption.name;
          }
        }

        return {
          ...pkg,
          selectedOptionName
        };
      });
      return orderObj;
    });

    res.json(transformedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// ...existing code...
// ...existing code...







// READ Order by ID
// READ Order by ID
// READ Order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
      .populate({
        path: 'packages.package',
        select: 'name'
      })
      .populate({
        path: 'packages.variation',
        select: 'name options'
      });
      
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Transform order data to include selectedOption names
    const transformedOrder = order.toObject();
    transformedOrder.packages = transformedOrder.packages.map(pkg => {
      let selectedOptionName = 'No variation';
      
      // Check for selectedOption from the stored data
      if (pkg.selectedOption && pkg.selectedOption.name) {
        selectedOptionName = pkg.selectedOption.name;
      }
      // If no selectedOption, try to find from variation
      else if (pkg.variation && pkg.variation.options) {
        const matchingOption = pkg.variation.options.find(
          opt => opt._id.toString() === pkg.variationOption?.toString()
        );
        if (matchingOption) {
          selectedOptionName = matchingOption.name;
        }
      }

      return {
        ...pkg,
        selectedOptionName
      };
    });

    res.status(200).json(transformedOrder);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: error.message });
  }
};

// UPDATE Order by ID
const updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the order first
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update customer information
    order.customer = {
      name: req.body.customerName,
      email: req.body.customerEmail,
      age: Number(req.body.customerAge),
      weight: Number(req.body.customerWeight),
      phone: req.body.customerPhone,
      address: req.body.customerAddress,
      pastPatientHistory: req.body.pastPatientHistory
    };

    // Update status if provided
    if (req.body.status) {
      order.status = req.body.status;
    }

    // Update the order
    const updatedOrder = await order.save();

    // Fetch the updated order with populated fields
    const populatedOrder = await Order.findById(updatedOrder._id)
      .populate({
        path: 'packages.package',
        select: 'name'
      })
      .populate({
        path: 'packages.variation',
        select: 'name options'
      });

    res.status(200).json(populatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE Order by ID
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
