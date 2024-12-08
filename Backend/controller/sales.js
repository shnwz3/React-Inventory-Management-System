const Sales = require("../models/sales");
const soldStock = require("../controller/soldStock"); // Assuming soldStock handles stock updates.

// Add Sales
const addSales = (req, res) => {
  const addSale = new Sales({
    userID: req.body.userID,
    ProductID: req.body.productID,
    CategoryID: req.body.categoryID, // Added for category alignment
    StockSold: req.body.stockSold,
    SaleDate: req.body.saleDate,
    TotalSaleAmount: req.body.totalSaleAmount,
  });

  addSale
    .save()
    .then((result) => {
      soldStock(req.body.productID, req.body.stockSold); // Adjusted to update stock for products.
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message }); // Improved error handling
    });
};

// Get All Sales Data
const getSalesData = async (req, res) => {
  try {
    const findAllSalesData = await Sales.find({ userID: req.params.userID })
      .sort({ _id: -1 })
      .populate("ProductID")
      .populate("CategoryID"); // Populate CategoryID instead of StoreID.

    res.status(200).json(findAllSalesData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sales data" });
  }
};

// Get total sales amount
const getTotalSalesAmount = async (req, res) => {
  try {
    const salesData = await Sales.find({ userID: req.params.userID });
    const totalSaleAmount = salesData.reduce((acc, sale) => acc + sale.TotalSaleAmount, 0);
    res.status(200).json({ totalSaleAmount });
  } catch (error) {
    res.status(500).json({ error: "Error calculating total sales amount" });
  }
};

// Get Monthly Sales
const getMonthlySales = async (req, res) => {
  try {
    const sales = await Sales.find();

    // Initialize array with 12 zeros
    const salesAmount = Array(12).fill(0);

    sales.forEach((sale) => {
      const monthIndex = parseInt(sale.SaleDate.split("-")[1]) - 1;
      salesAmount[monthIndex] += sale.TotalSaleAmount;
    });

    res.status(200).json({ salesAmount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addSales, getSalesData, getTotalSalesAmount, getMonthlySales };
