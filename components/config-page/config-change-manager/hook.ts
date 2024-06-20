import { MESSAGE_CONF_KEY, NODE_REL_KEY } from "@/constants/env-config";
import {
	useConfigLoadStateStore,
	useMessageConfigStore,
	useNodeRelationsStore,
} from "@/store";
import { useEffect } from "react";

export const useChangeConfigManager = () => {
	const { messageConfigs } = useMessageConfigStore();
	const { nodeRelations } = useNodeRelationsStore();
	const { isConfigLoaded } = useConfigLoadStateStore();

	useEffect(() => {
		if (isConfigLoaded && messageConfigs) {
			localStorage.setItem(
				MESSAGE_CONF_KEY,
				JSON.stringify(Object.fromEntries(messageConfigs)),
			);
		}
	}, [messageConfigs, isConfigLoaded]);

	useEffect(() => {
		if (isConfigLoaded && nodeRelations) {
			localStorage.setItem(
				NODE_REL_KEY,
				JSON.stringify(Object.fromEntries(nodeRelations)),
			);
		}
	}, [nodeRelations, isConfigLoaded]);
};
