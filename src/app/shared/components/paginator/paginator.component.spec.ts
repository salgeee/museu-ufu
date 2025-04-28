import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
	let spectator: Spectator<PaginatorComponent>;
	const createComponent = createComponentFactory({
		component: PaginatorComponent,
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should calculate total pages correctly', () => {
		spectator.setInput('length', 100);
		spectator.setInput('pageSize', 10);
		spectator.detectChanges();
		expect(spectator.component.totalPages).toBe(10);
	});

	it('should emit page event on next page', () => {
		const pageSpy = jest.spyOn(spectator.component.page, 'emit');
		spectator.component.nextPage();
		expect(pageSpy).toHaveBeenCalledWith({
			length: spectator.component.length,
			pageIndex: 2,
			pageSize: spectator.component.pageSize,
			previousPageIndex: 1,
		});
	});

	it('should emit page event on previous page', () => {
		spectator.setInput('pageIndex', 2);
		spectator.detectChanges();
		const pageSpy = jest.spyOn(spectator.component.page, 'emit');
		spectator.component.prevPage();
		expect(pageSpy).toHaveBeenCalledWith({
			length: spectator.component.length,
			pageIndex: 1,
			pageSize: spectator.component.pageSize,
			previousPageIndex: 2,
		});
	});

	it('should set page size correctly', () => {
		spectator.component.setPageSize(20);
		expect(spectator.component.pageSize).toBe(20);
	});

	it('should set page index correctly', () => {
		spectator.component.setPageIndex(3);
		expect(spectator.component.pageIndex).toBe(2);
	});

	it('should close all options when closeAll is called', () => {
		const closeSizeOptionsSpy = jest.spyOn(spectator.component, 'closeSizeOptions');
		spectator.component.expandedOptions = true;
		spectator.component.closeAll();
		expect(closeSizeOptionsSpy).toHaveBeenCalledWith('list-options-size');
		expect(closeSizeOptionsSpy).toHaveBeenCalledWith('list-options-page');
	});

	it('should set expanded attribute when toggling size options to true', () => {
		const element = document.createElement('div');
		spectator.component.toggleSizeOptions(element);
		expect(element.hasAttribute('expanded')).toBeTruthy();
	});

	it('should call closeAll when toggling size options', () => {
		const closeAllSpy = jest.spyOn(spectator.component, 'closeAll');
		const element = document.createElement('div');
		spectator.component.toggleSizeOptions(element);
		expect(closeAllSpy).toHaveBeenCalled();
	});

	it('should not set expanded attribute if element is null', () => {
		spectator.component.toggleSizeOptions(null);
		expect(spectator.component.expandedOptions).toBeTruthy();
	});

	it('should set pageIndex to totalPages - 1 if totalPages is less than pageIndex', () => {
		spectator.setInput('length', 50);
		spectator.setInput('pageSize', 10);
		spectator.setInput('pageIndex', 6);
		spectator.detectChanges();
		expect(spectator.component.pageIndex).toBe(4);
	});
});
