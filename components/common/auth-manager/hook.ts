import { getPrevToken } from "@/actions";
import {
	useAppLoadStateStore,
	useAuthStateStore,
	useAuthTokenStore,
	useMessageConfigStore,
	useNodeRelationsStore,
} from "@/store";
import { useEffect, useRef } from "react";

export const useAuthManager = () => {
	const { token, setToken } = useAuthTokenStore();
	const { isAuthenticated, setIsAuthenticated } = useAuthStateStore();
	const { isAppLoaded, setIsAppLoaded } = useAppLoadStateStore();

	// TODO: DELETE ONCE TEMP OVER INITIALIZATION
	const { addNodeRelation } = useNodeRelationsStore();
	const { setConfig } = useMessageConfigStore();

	const isAppMounted = useRef<boolean>(false);

	const onLoad = async () => {
		const prevAuthState = await getPrevToken();

		if (prevAuthState.isAuthenticated && prevAuthState.token) {
			setIsAuthenticated(true);
			setToken(prevAuthState.token);
		}

		addNodeRelation("root", []);
		setConfig("root", {
			name: "☠️ Sabka Maut",
			description: "",
			isAiMessage: false,
			embeds: [],
		});
		setIsAppLoaded(true);
	};

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
