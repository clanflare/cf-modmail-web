import { saveAuthToken } from "@/actions";
import {
	useAppLoadStateStore,
	useAuthStateStore,
	useAuthTokenStore,
} from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Args {
	token: string;
}

export const useMagicLinkScreen = (args: Args) => {
	const { token } = args;

	const { setToken } = useAuthTokenStore();
	const { setIsAuthenticated } = useAuthStateStore();
	const { isAppLoaded } = useAppLoadStateStore();
	const router = useRouter();

	const saveToken = async () => {
		const response = await saveAuthToken({
			token,
		});

		if (response.authToken) {
			setToken(response.authToken);
			setIsAuthenticated(true);
			router.replace("/");
		}
	};

	useEffect(() => {
		if (isAppLoaded && token) {
			saveToken();
		}
	}, [token, isAppLoaded]);
};
