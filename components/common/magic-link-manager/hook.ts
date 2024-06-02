import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AUTH_SEARCH_PARAM, AUTH_TOKEN_KEY_LS } from "@/constants/env-config";
import { useEffect } from "react";

export const useMagicLinkManager = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const authToken = searchParams.get(AUTH_SEARCH_PARAM);

	const onTokenFound = (token: string) => {
		localStorage.setItem(AUTH_TOKEN_KEY_LS, token);

		// TODO: refresh other local-storage states here

		router.replace(pathname);
	};

	useEffect(() => {
		if (authToken) onTokenFound(authToken);
	}, [authToken]);
};
