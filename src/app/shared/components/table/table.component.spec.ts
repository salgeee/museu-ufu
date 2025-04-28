import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { Columns, TableAction, TableComponent } from './table.component';
import { DatePipe } from '@angular/common';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ButtonDirective } from '@shared/directives/button';

describe('TableComponent', () => {
	let spectator: Spectator<TableComponent>;
	const createComponent = createComponentFactory({
		component: TableComponent,
		imports: [DatePipe, NgxMaskPipe, CdkTableModule, CdkMenuModule, ButtonDirective],
		providers: [provideNgxMask()],
		shallow: true,
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should display the correct table title', () => {
		spectator.setInput('title-table', 'Test Table');
		spectator.setInput('showHeader', true);
		const title = spectator.query('.table-title');
		expect(title).toHaveText('Test Table');
	});

	it('should display the correct number of columns', () => {
		const columns: Columns[] = [
			{ columnDef: 'name', header: 'Name', cell: (row: any) => row.name },
			{ columnDef: 'age', header: 'Age', cell: (row: any) => row.age },
		];
		const data = [
			{ name: 'John', age: 30 },
			{ name: 'Jane', age: 25 },
		];
		spectator.setInput('columns', columns);
		spectator.setInput('data', data);
		spectator.component.ngOnInit();
		spectator.detectChanges();
		const headers = spectator.queryAll('th');
		expect(headers.length).toBe(2);
	});

	it('should display the correct number of rows', () => {
		const data = [
			{ name: 'John', age: 30 },
			{ name: 'Jane', age: 25 },
		];
		spectator.setInput('data', data);
		spectator.detectChanges();
		const rows = spectator.queryAll('tr[cdk-row]');
		expect(rows.length).toBe(2);
	});
});
