import { getPrevToken } from "@/actions";
import {
	useAppLoadStateStore,
	useAuthStateStore,
	useAuthTokenStore,
} from "@/store";
import { useEffect, useRef } from "react";

export const useAuthManager = () => {
	const { token, setToken } = useAuthTokenStore();
	const { isAuthenticated, setIsAuthenticated } = useAuthStateStore();
	const { isAppLoaded, setIsAppLoaded } = useAppLoadStateStore();

	const isAppMounted = useRef<boolean>(false);

	const onLoad = async () => {
		const prevAuthState = await getPrevToken();

		if (prevAuthState.isAuthenticated && prevAuthState.token) {
			setIsAuthenticated(true);
			setToken(prevAuthState.token);
		}

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
