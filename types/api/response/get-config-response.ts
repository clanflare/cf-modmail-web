interface Embed {
	title?: string;
	url?: string;
	description?: string;
	timestamp?: string;
	color?: string;
	footer?: {
		text?: string;
		iconUrl?: string;
	};
	image?: string;
	thumbnail?: string;
	video?: string;
}

interface SupportMessage {
	content: String;
	attachments?: Array<string>;
	embeds?: Array<Embed>;
}

interface MessageButton {
	label: string;
	linkedComponent: MessageComponent;
	emoji?: string;
	style?: "Primary" | "Secondary" | "Success" | "Danger";
}

interface MessageComponent {
	message: SupportMessage;
	aiPrompt?: string;
	buttons?: Array<MessageButton>;
}

export interface ConfigResponse {
	archiveChannelId?: string;
	modmailCategoryId?: string;
	aiSupport?: boolean;
	initialMessage: MessageComponent;
}
