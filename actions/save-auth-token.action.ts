"use server";

import { AUTH_TOKEN_KEY, ENV } from "@/constants/env-config";
import { cookies } from "next/headers";

interface Args {
	token: string;
}

export const saveAuthToken = async (args: Args) => {
	const { token } = args;

	const cookieStore = cookies();

	cookieStore.set(AUTH_TOKEN_KEY, token, {
		httpOnly: true,
		secure: ENV === "production",
		expires: new Date(Date.now() + 1000 * 60 * 60),
	});

	return {
		authToken: token,
	};
};
