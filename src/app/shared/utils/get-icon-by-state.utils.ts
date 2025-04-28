export const ICONS_BY_STATE = {
	success: 'fa-check-circle',
	danger: 'fa-times-circle',
	warning: 'fa-exclamation-triangle',
	info: 'fa-info-circle',
	['']: '',
};

export type StateType = keyof typeof ICONS_BY_STATE;

/**
 * Função que retorna o ícone de acordo com o estado passado.
 * @param state
 * @returns Ícone correspondente ao estado.
 * @example
 * getIconByStateUtils('success');
 * // Retorna 'fa-check-circle'
 */
export const getIconByStateUtils = (state: StateType) => {
	return ICONS_BY_STATE[state] || '';
};
