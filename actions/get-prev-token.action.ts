"use server";

import { AUTH_TOKEN_KEY } from "@/constants/env-config";
import { cookies } from "next/headers";

export const getPrevToken = async () => {
	const cookieStore = cookies();

	const oldToken = cookieStore.get(AUTH_TOKEN_KEY)?.value;

	return {
		isAuthenticated: oldToken ? true : false,
		token: oldToken ?? null,
	};
};
