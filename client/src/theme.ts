// client/src/theme.ts

import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

const theme = extendTheme({
	config,
	colors: {
		brand: {
			50: "#e3f2fd",
			100: "#bbdefb",
			200: "#90caf9",
			300: "#64b5f6",
			400: "#42a5f5",
			500: "#2196f3",
			600: "#1e88e5",
			700: "#1976d2",
			800: "#1565c0",
			900: "#0d47a1",
		},
	},
	fonts: {
		heading: `'Roboto', sans-serif`,
		body: `'Roboto', sans-serif`,
	},
	// We add a new `styles` object to control global styles
	styles: {
		global: (props: any) => ({
			body: {
				// Here we use the `mode` utility to set colors for light/dark
				bg: mode("gray.50", "gray.800")(props),
				color: mode("gray.800", "whiteAlpha.900")(props),
			},
		}),
	},
	// We can also add styles for specific components
	components: {
		Heading: {
			baseStyle: (props: any) => ({
				// We'll use a darker blue for headings in light mode, and a lighter blue in dark mode
				color: mode("brand.700", "brand.300")(props),
			}),
		},
		Box: {
			baseStyle: (props: any) => ({
				// This will style all our card-like boxes
				bg: mode("white", "gray.700")(props),
			}),
		},
	},
});

export default theme;
