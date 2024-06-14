"use server";

import { AUTH_TOKEN_KEY } from "@/constants/env-config";
import { cookies } from "next/headers";

export const deleteAuthToken = async () => {
	const cookieStore = cookies();

	cookieStore.delete(AUTH_TOKEN_KEY);
};
