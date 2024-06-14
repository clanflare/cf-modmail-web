import { MainNavbar, MainSidebar } from "@/components/common";

export default function Home() {
	return (
		<>
			<MainNavbar />
			<MainSidebar />
			<main className="flex min-h-screen flex-col w-full bg-primary-dark"></main>
		</>
	);
}
