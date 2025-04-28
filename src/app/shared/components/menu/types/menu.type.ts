export type IMenu = {
	id?: number;
	icon: string;
	label: string;
	external?: boolean;
	url?: string;
	children?: Array<IMenu>;
};
