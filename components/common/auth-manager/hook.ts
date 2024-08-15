import { getPrevToken } from "@/actions";
import {
	API_ENDPOINT,
	MESSAGE_CONF_KEY,
	NODE_REL_KEY,
} from "@/constants/env-config";
import {
	useAppLoadStateStore,
	useAuthStateStore,
	useAuthTokenStore,
	useConfigLoadStateStore,
	useMessageConfigStore,
	useNodeRelationsStore,
} from "@/store";
import { MessageConfig } from "@/types/models";
import { parseConfigResponse } from "@/utils";
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

	// TODO: Extract this to a loader component and write the save data parser as well.

	const loadPrevData = async () => {
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
			try {
				const apiResponse = await fetch(`${API_ENDPOINT}/editor`, {
					method: "GET",
					headers: {
						authorization: `Bearer ${token}`,
						"content-type": "application/json",
					},
				});

				const apiResData = await apiResponse.json();

				console.log(apiResData);
				console.log(apiResData.message !== "Successful");

				if (apiResData.message !== "Successful") {
					throw new Error("Something went wrong!!");
				}

				console.log("HERE");

				const data = parseConfigResponse(apiResData.data);

				console.log(data);

				if (data) {
					setNodeRelations(data.nodeRelations);
					setMessageConfigs(data.messageConfigs);
				} else {
					addNodeRelation("root", []);
					setConfig("root", {
						name: "Initial Message",
						description: "",
						isAiMessage: false,
						embeds: [],
					});
				}
			} catch (error) {
				console.log(error);
				console.log("Something went wrong!!");
				addNodeRelation("root", []);
				setConfig("root", {
					name: "Initial Message",
					description: "",
					isAiMessage: false,
					embeds: [],
				});
			}

			// Call API and parse relations & if still do not find anything then go this way.
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
