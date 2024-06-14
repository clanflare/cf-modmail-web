import { NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN_KEY, NEXT_URL } from "@/constants/env-config";
import { ProtectedRoutes, UnprotectedRoutes } from "./constants/routes";

export const middleware = (request: NextRequest) => {
	const nextUrl = request.nextUrl.pathname;
	const authToken = request.cookies.get(AUTH_TOKEN_KEY)?.value;

	if (ProtectedRoutes.has(nextUrl)) {
		if (authToken) NextResponse.redirect(`${NEXT_URL}/login`);
		else NextResponse.next();
	}

	if (UnprotectedRoutes.has(nextUrl)) {
		if (!authToken) NextResponse.redirect(`${NEXT_URL}`);
		else NextResponse.next();
	}

	return NextResponse.next();
};
