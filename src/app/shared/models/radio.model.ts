export type RadioOptions = Array<RadioOption>;

export interface RadioOption {
	label: string;
	value: string | number;
	disabled?: boolean;
	state?: 'valid' | 'invalid' | '';
}
