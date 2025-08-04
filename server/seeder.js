// This file is not part of our running server, it's a separate script.
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load our models
const Product = require("./models/product");
const Sale = require("./models/sale");

// Load env vars
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Connect to DB
connectDB();

// --- OUR SAMPLE DATA ---
const products = [
	{
		name: "The Lone Star Smoker",
		price: 399.99,
		cost: 189.5,
	},
	{
		name: "The Brazos Beast",
		price: 749.99,
		cost: 355.0,
	},
];

// This is just a template for sales. We will dynamically add the product IDs later.
const salesTemplate = [
	{
		quantity: 1,
		salePrice: 399.99,
		marketingChannel: "Google Ads",
		saleDate: new Date("2025-07-01"),
	},
	{
		quantity: 1,
		salePrice: 749.99,
		marketingChannel: "Facebook Ads",
		saleDate: new Date("2025-07-02"),
	},
	{
		quantity: 2,
		salePrice: 399.99,
		marketingChannel: "Email",
		saleDate: new Date("2025-07-03"),
	},
	{
		quantity: 1,
		salePrice: 399.99,
		marketingChannel: "Direct",
		saleDate: new Date("2025-07-05"),
	},
	{
		quantity: 1,
		salePrice: 749.99,
		marketingChannel: "Google Ads",
		saleDate: new Date("2025-07-06"),
	},
	{
		quantity: 1,
		salePrice: 749.99,
		marketingChannel: "Email",
		saleDate: new Date("2025-07-10"),
	},
];
// --- END OF SAMPLE DATA ---

// Function to import data
const importData = async () => {
	try {
		// Clear out any existing data
		await Product.deleteMany();
		await Sale.deleteMany();

		// Insert products and get them back with their new _id's
		const createdProducts = await Product.insertMany(products);
		console.log("Products Imported...");

		// Get the IDs from our newly created products
		const product1Id = createdProducts[0]._id;
		const product2Id = createdProducts[1]._id;

		// Create the final sales data by mapping our template and adding the real product IDs
		const sales = [
			{
				product: product1Id,
				quantity: 1,
				salePrice: 399.99,
				marketingChannel: "Google Ads",
				saleDate: new Date("2025-07-01"),
			},
			{
				product: product2Id,
				quantity: 1,
				salePrice: 749.99,
				marketingChannel: "Facebook Ads",
				saleDate: new Date("2025-07-02"),
			},
			{
				product: product1Id,
				quantity: 2,
				salePrice: 399.99,
				marketingChannel: "Email",
				saleDate: new Date("2025-07-03"),
			},
			{
				product: product1Id,
				quantity: 1,
				salePrice: 399.99,
				marketingChannel: "Direct",
				saleDate: new Date("2025-07-05"),
			},
			{
				product: product2Id,
				quantity: 1,
				salePrice: 749.99,
				marketingChannel: "Google Ads",
				saleDate: new Date("2025-07-06"),
			},
			{
				product: product2Id,
				quantity: 1,
				salePrice: 749.99,
				marketingChannel: "Email",
				saleDate: new Date("2025-07-10"),
			},
		];

		// Insert the final sales data
		await Sale.insertMany(sales);
		console.log("Sales Imported...");

		console.log("Data Imported!");
	} catch (error) {
		console.error(`Import failed: ${error}`);
	}
};

// Function to destroy data
const destroyData = async () => {
	try {
		await Product.deleteMany();
		await Sale.deleteMany();
		console.log("Data Destroyed!");
	} catch (error) {
		console.error(`Destroy failed: ${error}`);
	}
};

// Main function to run the seeder
const runSeeder = async () => {
	// First, connect to the database
	await connectDB();

	// Check command line arguments
	if (process.argv[2] === "-d") {
		await destroyData();
	} else {
		await importData();
	}
	// Exit the process
	process.exit();
};

// Run the main function
runSeeder();
