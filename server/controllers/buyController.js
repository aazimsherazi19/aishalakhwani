const Buy = require('../models/buyModel');
const Package = require('../models/packagesModel');
const Variation = require('../models/variatonModel');

// Create Buy Record for the selected package
const createBuy = async (req, res) => {
  const { packages } = req.body;  // Packages with selected options and variations

  try {
    let totalAmount = 0;
    const packageDetails = [];

    for (const package of packages) {
      const { packageId, variationId, variationOptionId } = package;

      // Fetch Package details
      const pkg = await Package.findById(packageId).populate('variation');
      let price = pkg.price;

      // Check if there's a variation selected
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

    // Create new Buy record
    const buy = new Buy({
      packages: packageDetails,
      totalAmount
    });

    await buy.save();
    res.status(201).json(buy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Buy Record by ID with transformed data
const getBuyById = async (req, res) => {
  const { id } = req.params;
  try {
    const buy = await Buy.findById(id)
      .populate({
        path: 'packages.package',
        select: 'name image'  // Including image to display in the right corner
      })
      .populate({
        path: 'packages.variation',
        select: 'name options'
      });

    if (!buy) {
      return res.status(404).json({ message: 'Buy record not found' });
    }

    // Transform buy data to include selectedOption names and other details
    const transformedBuy = buy.toObject();
    transformedBuy.packages = transformedBuy.packages.map(pkg => {
      let selectedOptionName = 'No variation';
      let selectedOptionPrice = pkg.price;
      let selectedOptionImage = pkg.package.image;

      // Check for selectedOption from the stored data
      if (pkg.selectedOption && pkg.selectedOption.name) {
        selectedOptionName = pkg.selectedOption.name;
        selectedOptionPrice = pkg.selectedOption.price;
      }

      // If no selectedOption, try to find from variation
      else if (pkg.variation && pkg.variation.options) {
        const matchingOption = pkg.variation.options.find(
          opt => opt._id.toString() === pkg.selectedOption?.optionId.toString()
        );
        if (matchingOption) {
          selectedOptionName = matchingOption.name;
          selectedOptionPrice = matchingOption.price;
        }
      }

      return {
        ...pkg,
        selectedOptionName,
        selectedOptionPrice,
        selectedOptionImage
      };
    });

    res.status(200).json(transformedBuy);
  } catch (error) {
    console.error("Error fetching buy record:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get All Buy Records (Optional, for admin or reviews)
const getAllBuys = async (req, res) => {
  try {
    const buys = await Buy.find()
      .populate({
        path: 'packages.package',
        select: 'name image'
      })
      .populate({
        path: 'packages.variation',
        select: 'name options'
      });

    // Transform buy data for each record
    const transformedBuys = buys.map(buy => {
      const buyObj = buy.toObject();
      buyObj.packages = buyObj.packages.map(pkg => {
        let selectedOptionName = 'No variation';
        let selectedOptionPrice = pkg.price;
        let selectedOptionImage = pkg.package.image;

        // Check for selectedOption from the stored data
        if (pkg.selectedOption && pkg.selectedOption.name) {
          selectedOptionName = pkg.selectedOption.name;
          selectedOptionPrice = pkg.selectedOption.price;
        }

        // If no selectedOption, try to find from variation
        else if (pkg.variation && pkg.variation.options) {
          const matchingOption = pkg.variation.options.find(
            opt => opt._id.toString() === pkg.selectedOption?.optionId.toString()
          );
          if (matchingOption) {
            selectedOptionName = matchingOption.name;
            selectedOptionPrice = matchingOption.price;
          }
        }

        return {
          ...pkg,
          selectedOptionName,
          selectedOptionPrice,
          selectedOptionImage
        };
      });
      return buyObj;
    });

    res.status(200).json(transformedBuys);
  } catch (error) {
    console.error("Error fetching all buys:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBuy,
  getBuyById,
  getAllBuys
};
