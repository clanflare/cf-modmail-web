import { saveAuthToken } from "@/actions";
import { useAuthTokenStore } from "@/store";
import { useEffect } from "react";

interface Args {
	token: string;
}

export const useMagicLinkScreen = (args: Args) => {
	const { token } = args;

	const { setToken } = useAuthTokenStore();
    // const {} = us

	const saveToken = async () => {
		const response = await saveAuthToken({
			token,
		});

		if (response.authToken) {
			setToken(response.authToken);
            
		}
	};

	useEffect(() => {}, [token]);
};
