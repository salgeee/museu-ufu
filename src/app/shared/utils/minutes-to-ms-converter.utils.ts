/**
 * Convert minutes to milliseconds
 * @param minutes
 * @returns The number of milliseconds.
 * @example
 * minutesToMsConverterUtils(1);
 * // Returns 60000
 */
export const minutesToMsConverterUtils = (minutes: number): number => {
	return minutes * 60 * 1000;
};
