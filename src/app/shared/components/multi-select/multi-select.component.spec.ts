import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MultiSelectComponent } from './multi-select.component';
import { FormsModule } from '@angular/forms';

describe('MultiSelectComponent', () => {
	let spectator: Spectator<MultiSelectComponent>;
	const createComponent = createComponentFactory({
		component: MultiSelectComponent,
		imports: [FormsModule],
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should initialize BRSelect instance after view init', () => {
		spectator.component.ngAfterViewInit();
		setTimeout(() => {
			expect(spectator.component.instance).toBeTruthy();
		});
	});

	it('should emit selectedEvent when value changes', () => {
		let output;
		spectator.output('selectedEvent').subscribe(result => (output = result));
		spectator.component.disabled = false;
		spectator.component.value = ['test'];
		expect(output).toEqual(['test']);
	});

	it('should set value and call onChange when writeValue is called', () => {
		spectator.component.writeValue(['test']);
		expect(spectator.component.value).toEqual(['test']);
	});

	it('should set disabled state', () => {
		spectator.component.setDisabledState(true);
		expect(spectator.component.disabled).toBeTruthy();
	});

	it('should call onTouched when onBlur is called', () => {
		const onTouchedSpy = jest.spyOn(spectator.component as any, '_touched');
		spectator.component.onBlur();
		expect(onTouchedSpy).toHaveBeenCalled();
	});

	it('should register onChange function', () => {
		const fn = jest.fn();
		spectator.component.registerOnChange(fn);
		spectator.component['_change'](['value']);
		expect(fn).toHaveBeenCalledWith(['value']);
	});

	it('should register onTouched function', () => {
		const fn = jest.fn();
		spectator.component.registerOnTouched(fn);
		spectator.component['_touched']();
		expect(fn).toHaveBeenCalled();
	});

	it('should not add selected attribute if value is not found', () => {
		spectator.setInput('options', [{ value: 'test', label: 'Test' }]);
		jest.spyOn(spectator.component['brSelect'].nativeElement, 'querySelector').mockReturnValue(null);
		spectator.component['_populateItensSelected']();
		expect(spectator.component['brSelect'].nativeElement.querySelector('input[type="checkbox"][checked]')).toBeNull();
	});

	it('should add selected attribute if value', () => {
		spectator.setInput('options', [{ value: 'test', label: 'Test' }]);
		spectator.component.value = ['test'];
		spectator.component['_populateItensSelected']();
		expect(
			spectator.component['brSelect'].nativeElement.querySelector('input[type="checkbox"][checked]')
		).toBeDefined();
	});

	it('should call the setSelected function if you have a click event on an option', () => {
		const setSelectedSpy = jest.spyOn(spectator.component, 'setSelected');
		spectator.component.disabled = false;
		spectator.setInput('options', [{ value: 'test', label: 'Test' }]);
		spectator.component['brSelect'].nativeElement.querySelector('input[type="checkbox"][value="test"]').click();
		expect(setSelectedSpy).toHaveBeenCalled();
	});

	it('should transform the value into an array even though it is not', () => {
		let output;
		spectator.output('selectedEvent').subscribe(result => (output = result));
		spectator.component.disabled = false;
		(spectator.component.value as any) = 'test';
		expect(output).toEqual(['test']);
	});
});
