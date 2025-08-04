const mongoose = require("mongoose");
const saleSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		default: 1,
	},
	salePrice: {
		type: Number,
		required: true,
	},
	marketingChannel: {
		type: String,
		required: true,
		enum: ["Google Ads", "Facebook Ads", "Email", "Direct"],
	},
	saleDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model("Sale", saleSchema);
