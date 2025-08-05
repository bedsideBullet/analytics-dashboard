import { useState, useEffect, useMemo } from "react";
import "./App.css";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Button, Flex, Spacer, Spinner } from "@chakra-ui/react";
import {
	Container,
	Heading,
	Text,
	VStack,
	UnorderedList,
	ListItem,
	Box,
	SimpleGrid,
	StatGroup,
	Stat,
	StatLabel,
	StatNumber,
	Image,
	useColorMode,
} from "@chakra-ui/react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

interface Product {
	_id: string;
	name: string;
	price: number;
	cost: number;
}

interface Sale {
	_id: string;
	product: string;
	quantity: number;
	salePrice: number;
	marketingChannel: string;
	saleDate: string;
}

function App() {
	const [products, setProducts] = useState<Product[]>([]);
	const [sales, setSales] = useState<Sale[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { colorMode } = useColorMode();

	const API_BASE_URL = import.meta.env.VITE_API_URL;

	const fetchData = async () => {
		try {
			// Fetch both products and sales
			const productsResponse = await fetch(`${API_BASE_URL}/api/products`);
			const productsData: Product[] = await productsResponse.json();
			setProducts(productsData);

			const salesResponse = await fetch(`${API_BASE_URL}/api/sales`);
			const salesData: Sale[] = await salesResponse.json();
			setSales(salesData);
		} catch (error) {
			console.error("Failed to fetch data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleReseed = async () => {
		setIsLoading(true);
		try {
			await fetch("${API_BASE_URL}/api/seed", { method: "POST" });
			await fetchData();
		} catch (error) {
			console.error("Failed to reseed database:", error);
		}
		setIsLoading(false);
	};

	const { totalRevenue, grossProfit } = useMemo(() => {
		if (products.length === 0 || sales.length === 0) {
			return { totalRevenue: 0, grossProfit: 0 };
		}

		const totalRevenue = sales.reduce(
			(acc, sale) => acc + sale.salePrice * sale.quantity,
			0
		);

		const totalCost = sales.reduce((acc, sale) => {
			const product = products.find((p) => p._id === sale.product);
			const cost = product ? product.cost : 0;
			return acc + cost * sale.quantity;
		}, 0);

		const grossProfit = totalRevenue - totalCost;

		return { totalRevenue, grossProfit };
	}, [products, sales]);

	const chartData = useMemo(() => {
		if (sales.length === 0) return [];

		const revenueByChannel: { [key: string]: number } = {};

		sales.forEach((sale) => {
			const channel = sale.marketingChannel;
			const revenue = sale.salePrice * sale.quantity;

			if (!revenueByChannel[channel]) {
				revenueByChannel[channel] = 0;
			}
			revenueByChannel[channel] += revenue;
		});

		return Object.entries(revenueByChannel).map(([name, revenue]) => ({
			name,
			revenue,
		}));
	}, [sales]);

	return (
		<Container maxW="container.xl" py={8}>
			<VStack spacing={8} align="stretch" w="100%">
				<Flex alignItems="center" w="100%">
					{/* Conditionally render the correct logo */}
					<Image
						boxSize="60px" // Adjust size as needed
						src={colorMode === "light" ? "/logo-light.png" : "/logo-dark.png"}
						alt="Texas Trail Grills Logo"
					/>
					<Heading as="h1" size="xl" ml={4}>
						Texas Trail Grills
					</Heading>
					<Spacer />
					<Button
						colorScheme="teal"
						onClick={handleReseed}
						isLoading={isLoading}
						spinner={<Spinner size="sm" />}
					>
						Reseed Data
					</Button>
					<ColorModeSwitcher />
				</Flex>
				<StatGroup borderWidth="1px" borderRadius="lg" p={5} shadow="md">
					<Stat>
						<StatLabel>Total Revenue</StatLabel>
						<StatNumber>${totalRevenue.toFixed(2)}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Gross Profit</StatLabel>
						<StatNumber>${grossProfit.toFixed(2)}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Total Sales</StatLabel>
						<StatNumber>{sales.length}</StatNumber>
					</Stat>
				</StatGroup>

				<SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
					<Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
						<Heading as="h2" size="lg" mb={4}>
							Our Products
						</Heading>
						<UnorderedList spacing={3}>
							{products.map((product) => (
								<ListItem key={product._id}>
									<Text as="span" fontWeight="bold">
										{product.name}
									</Text>{" "}
									- ${product.price}
								</ListItem>
							))}
						</UnorderedList>
					</Box>

					<Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
						<Heading as="h2" size="lg" mb={4}>
							Recent Sales
						</Heading>
						<UnorderedList spacing={3}>
							{sales.map((sale) => (
								<ListItem key={sale._id}>
									Sale of {sale.quantity} item(s) via {sale.marketingChannel}
								</ListItem>
							))}
						</UnorderedList>
					</Box>
				</SimpleGrid>
				<Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
					<Heading as="h2" size="lg" mb={4}>
						Revenue by Marketing Channel
					</Heading>
					<ResponsiveContainer width="100%" height={400}>
						<BarChart
							data={chartData}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
							<Legend />
							<Bar dataKey="revenue" fill="#8884d8" />
						</BarChart>
					</ResponsiveContainer>
				</Box>
			</VStack>
		</Container>
	);
}

export default App;
