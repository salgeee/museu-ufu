export interface SelectOptions extends Array<SelectOption> {}

export interface SelectOption {
	value: string | number;
	label: string;
}
