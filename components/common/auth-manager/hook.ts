import { getPrevToken } from "@/actions";
import { MESSAGE_CONF_KEY, NODE_REL_KEY } from "@/constants/env-config";
import {
	useAppLoadStateStore,
	useAuthStateStore,
	useAuthTokenStore,
	useConfigLoadStateStore,
	useMessageConfigStore,
	useNodeRelationsStore,
} from "@/store";
import { MessageConfig } from "@/types/models";
import { useEffect, useRef } from "react";

export const useAuthManager = () => {
	const { token, setToken } = useAuthTokenStore();
	const { isAuthenticated, setIsAuthenticated } = useAuthStateStore();
	const { isAppLoaded, setIsAppLoaded } = useAppLoadStateStore();

	// TODO: DELETE ONCE TEMP OVER INITIALIZATION
	const { addNodeRelation, setNodeRelations } = useNodeRelationsStore();
	const { setConfig, setMessageConfigs } = useMessageConfigStore();
	const { setIsConfigLoaded } = useConfigLoadStateStore();

	const isAppMounted = useRef<boolean>(false);

	const onLoad = async () => {
		const prevAuthState = await getPrevToken();

		if (prevAuthState.isAuthenticated && prevAuthState.token) {
			setIsAuthenticated(true);
			setToken(prevAuthState.token);
		}

		setIsAppLoaded(true);
	};

	const loadPrevData = () => {
		const savedMessageConfigsString =
			localStorage.getItem(MESSAGE_CONF_KEY);
		const savedNodeRelationsString = localStorage.getItem(NODE_REL_KEY);

		const savedMessageConfigs = savedMessageConfigsString
			? new Map<string, MessageConfig>(
					Object.entries(JSON.parse(savedMessageConfigsString)),
				)
			: new Map<string, MessageConfig>();

		const savedNodeRelations = savedNodeRelationsString
			? new Map<string, Array<string>>(
					Object.entries(JSON.parse(savedNodeRelationsString)),
				)
			: new Map<string, Array<string>>();

		if (
			!savedMessageConfigs.get("root") ||
			!savedNodeRelations.get("root")
		) {
			// Call API and parse relations & if still do not find anything then go this way.

			addNodeRelation("root", []);
			setConfig("root", {
				name: "Initial Message",
				description: "",
				isAiMessage: false,
				embeds: [],
			});
		} else {
			setNodeRelations(savedNodeRelations);
			setMessageConfigs(savedMessageConfigs);
		}

		setIsConfigLoaded(true);
	};

	useEffect(() => {
		if (isAuthenticated) {
			loadPrevData();
		}
	}, [isAuthenticated]);

	useEffect(() => {
		if (isAppMounted.current) return;

		isAppMounted.current = true;
		onLoad();
	}, []);

	useEffect(() => {
		if (isAppLoaded && isAuthenticated && token) {
			console.log(token);
		}
	}, [isAppLoaded, token, isAuthenticated]);
};
