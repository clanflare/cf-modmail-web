import { MainNavbar, MainSidebar } from "@/components/common";
import { ConfigScreen } from "@/components/screens";

export default function Home() {
	return (
		<>
			<MainNavbar />
			<MainSidebar />
			<ConfigScreen />
		</>
	);
}
