import { useColorMode, IconButton } from "@chakra-ui/react";
import type { IconButtonProps } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher = (props: ColorModeSwitcherProps) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const text = `Switch to ${colorMode === "light" ? "dark" : "light"} mode`;
	const SwitchIcon = colorMode === "light" ? MoonIcon : SunIcon;

	return (
		<IconButton
			size="md"
			fontSize="lg"
			variant="ghost"
			color="current"
			marginLeft="2"
			onClick={toggleColorMode}
			icon={<SwitchIcon />}
			aria-label={text}
			{...props}
		/>
	);
};
