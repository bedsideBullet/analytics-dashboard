const express = require("express");
const router = express.Router();
const Sale = require("../models/sale");

router.get("/", async (req, res) => {
	try {
		const sales = await Sale.find({});
		res.json(sales);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
});

module.exports = router;
