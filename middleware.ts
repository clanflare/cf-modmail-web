import { NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN_KEY, NEXT_URL } from "@/constants/env-config";
import { PROTECTED_ROUTES, UNPROTECTED_ROUTES } from "@/constants/routes";

export const middleware = (request: NextRequest) => {
	const authToken = request.cookies.get(AUTH_TOKEN_KEY)?.value;
	const currentPathname = request.nextUrl.pathname;

	if (PROTECTED_ROUTES.has(currentPathname)) {
		if (!authToken) return NextResponse.redirect(`${NEXT_URL}/login`);
		else return NextResponse.next();
	}

	if (UNPROTECTED_ROUTES.has(currentPathname)) {
		if (authToken) return NextResponse.redirect(`${NEXT_URL}`);
		else return NextResponse.next();
	}

	return NextResponse.next();
};
