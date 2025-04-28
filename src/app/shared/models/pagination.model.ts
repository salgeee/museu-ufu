export interface Pagination<T = any> {
	data: T[];
	length: number;
	page: number;
	pageSize: number;
}
