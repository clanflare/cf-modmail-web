import { API_ENDPOINT } from "@/constants/env-config";
import {
	useAuthTokenStore,
	useMessageConfigStore,
	useNodeRelationsStore,
	useSidebarStateStore,
} from "@/store";
import { parseConfigStates } from "@/utils";

export const useConfigScreen = () => {
	const { isSidebarOpen } = useSidebarStateStore();
	const { messageConfigs } = useMessageConfigStore();
	const { nodeRelations } = useNodeRelationsStore();
	const { token } = useAuthTokenStore();

	const onSaveClick = async () => {
		try {
			const parsingResponse = parseConfigStates(
				"root",
				nodeRelations,
				messageConfigs,
			);

			console.log(parsingResponse);

			const response = await fetch(`${API_ENDPOINT}/editor`, {
				method: "POST",
				headers: {
					authorization: `Bearer ${token}`,
					"content-type": "application/json",
				},
				body: JSON.stringify(parsingResponse),
			});

			const apiData = await response.json();

			console.log(apiData);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
				return;
			}

			console.log("Something went wrong!!");
		}
	};

	return {
		isSidebarOpen,
		rootMessage: messageConfigs.get("root"),
		onSaveClick,
	};
};
