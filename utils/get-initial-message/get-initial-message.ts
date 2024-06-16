import { InitialMessages } from "@/constants/initial-messages";

export const getInitialMessage = () => {
	const randomIndex = Math.floor(Math.random() * InitialMessages.length);

	return InitialMessages[randomIndex] ?? "";
};
