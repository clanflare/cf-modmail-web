import { Embed } from "./embed";

export interface MessageConfig {
	name: string;
	description: string;
	isAiMessage: boolean;
	embeds: Array<Embed>;
}
