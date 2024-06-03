import { MainNavbar, MainSidebar } from "@/components/common";

export default function Home() {
	return (
		<>
			<MainNavbar />
			<MainSidebar />
			<main className="flex min-h-screen flex-col items-center justify-between p-24 bg-background dark:bg-dark-background"></main>
		</>
	);
}
