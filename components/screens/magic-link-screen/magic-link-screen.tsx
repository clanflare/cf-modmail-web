"use client";

import { LoaderCircle } from "lucide-react";
import { useMagicLinkScreen } from "./hook";

interface Props {
	token: string;
}

const MagicLinkScreen = (props: Props) => {
	useMagicLinkScreen({
		token: props.token,
	});

	return (
		<div className="w-full flex items-center justify-center font-bahnschrift">
			<LoaderCircle
				className="text-accent-background animate-spin"
				size={30}
			/>

			<p className="text-primary-light">Redirecting...</p>
		</div>
	);
};

export default MagicLinkScreen;
