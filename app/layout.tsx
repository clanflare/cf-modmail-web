import type { Metadata } from "next";
import "./globals.css";
import { AuthManager } from "@/components/common";
import { ThemeProvider } from "@/components/providers";

export const metadata: Metadata = {
	title: "Modmail",
	description: "Modmail... peace from people, who you would never meet. Mereko bhi nahi pata mai kya bol likh raha hum. Toh bakchodi band karke config likh le",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<ThemeProvider>
					<AuthManager />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
