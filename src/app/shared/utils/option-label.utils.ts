import {SelectOptions} from '../models/select.model';

/**
 * Função responsável por retornar o label de uma opção.
 * @param value Valor da opção.
 * @param options Opções disponíveis.
 */
export const getLabelByValue = (value: string, options: SelectOptions): string => {
	return options.find(option => option.value === value)?.label || '--';
};
