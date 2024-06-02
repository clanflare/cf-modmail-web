import { Theme } from "@/types/common";
import { create } from "zustand";

interface ThemeStore {
	theme: Theme;
	toggleTheme: (theme?: Theme, saveLastTheme?: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()((set) => ({
	theme: "light",
	toggleTheme: (theme, saveLastTheme) =>
		set((prev) => {
			if (saveLastTheme !== false) {
				localStorage.setItem(
					"theme",
					theme ? theme : prev.theme === "light" ? "dark" : "light",
				);
			}

			return {
				theme: theme
					? theme
					: prev.theme === "light"
						? "dark"
						: "light",
			};
		}),
}));
