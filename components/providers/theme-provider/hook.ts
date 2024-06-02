import { useEffect, useRef } from "react";
import { useThemeStore } from "@/store";

export const useThemeProvider = () => {
	const componentMounted = useRef<boolean>(false);
	const { theme, toggleTheme } = useThemeStore();

	const loadPreviousTheme = () => {
		const prevTheme = localStorage.getItem("theme");

		if (!prevTheme || (prevTheme !== "light" && prevTheme !== "dark")) {
			localStorage.setItem("theme", "light");
			return;
		}

		toggleTheme(prevTheme);
	};

	useEffect(() => {
		if (componentMounted.current) return;

		componentMounted.current = true;
		loadPreviousTheme();
	}, []);

	return {
		theme,
	};
};
