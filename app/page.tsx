import { MainNavbar, MainSidebar } from "@/components/common";
import { ConfigChangeManager } from "@/components/config-page";
import { ConfigScreen } from "@/components/screens";

export default function Home() {
	return (
		<>
			<ConfigChangeManager />
			<MainNavbar />
			<MainSidebar />
			<ConfigScreen />
		</>
	);
}
