export interface Embed {
	title?: string;
	description?: string;
	url?: string;
	color?: string;
	image_url?: string;
	thumbnail_url?: string;
	footer?: {
		text?: string;
		icon_url?: string;
	};
}
