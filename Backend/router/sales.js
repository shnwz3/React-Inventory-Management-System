const express = require("express");
const router = express.Router();
const salesController = require("../controller/sales");


// Add Sales
router.post("/add", salesController.addSales);

// Get All Sales
router.get("/get/:userID", salesController.getSalesData);

// Get Monthly Sales
router.get("/getmonthly", salesController.getMonthlySales);

// Get Total Sales Amount
router.get("/get/:userID/totalsaleamount", salesController.getTotalSalesAmount);



module.exports = router;
