import { Embed } from "./embed";

export interface MessageConfig {
	name: string;
	description: string;
	isAiMessage: boolean;
	aiInstructions: string | null;
	embeds: Array<Embed>;
	categoryId: string | null;
	messageToSupportTeam: string | null;
}
