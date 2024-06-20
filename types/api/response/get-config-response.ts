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
	content: string;
	attachments?: Array<string>;
	embeds?: Array<Embed>;
}

interface MessageButton {
	label: string;
	linkedComponent: MessageComponent;
	emoji?: string;
	style?: "Primary" | "Secondary" | "Success" | "Danger";
}

export interface MessageComponent {
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
