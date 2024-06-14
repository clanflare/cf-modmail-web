import { useEffect } from "react";

interface Args {
    token: string
}

export const useMagicLinkScreen = ( args: Args ) => {
    const { token } = args;

    useEffect(() => {

    }, [token])
}