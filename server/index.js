const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5001;
const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");
const seedRoutes = require("./routes/seedRoutes");
const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
	res.json({ message: "Hello from the Texas Trail Grills server!" });
});

app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/seed", seedRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
