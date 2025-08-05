const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Sale = require("../models/sale");

const productsData = [
	{ name: "The Lone Star Smoker", price: 399.99, cost: 189.5 },
	{ name: "The Brazos Beast", price: 749.99, cost: 355.0 },
];
const marketingChannels = ["Google Ads", "Facebook Ads", "Email", "Direct"];

router.post("/", async (req, res) => {
	try {
		await Product.deleteMany({});
		await Sale.deleteMany({});

		const createdProducts = await Product.insertMany(productsData);
		const product1 = createdProducts[0];
		const product2 = createdProducts[1];

		const newSales = [];
		for (let i = 0; i < 15; i++) {
			const product = Math.random() > 0.5 ? product1 : product2;
			const quantity = Math.floor(Math.random() * 3) + 1;
			const channel =
				marketingChannels[Math.floor(Math.random() * marketingChannels.length)];

			newSales.push({
				product: product._id,
				quantity: quantity,
				salePrice: product.price,
				marketingChannel: channel,
				saleDate: new Date(), // Use today's date
			});
		}

		await Sale.insertMany(newSales);

		res.status(201).json({ message: "Database Reseeded Successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error during reseed" });
	}
});

module.exports = router;
