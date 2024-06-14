"use server";

import { AUTH_TOKEN_KEY } from "@/constants/env-config";
import { cookies } from "next/headers";

interface Args {
	token: string;
}

export const saveAuthToken = async (args: Args) => {
	const { token } = args;

	const cookieStore = cookies();

	cookieStore.set(AUTH_TOKEN_KEY, token);

	return {
		authToken: token,
	};
};
