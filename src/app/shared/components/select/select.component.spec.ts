import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { SelectComponent } from './select.component';
import { FormsModule } from '@angular/forms';

describe('SelectComponent', () => {
	let spectator: Spectator<SelectComponent>;
	const createComponent = createComponentFactory({
		component: SelectComponent,
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
		spectator.component.value = 'test';
		expect(output).toBe('test');
	});

	it('should not emit selectedEvent when select is disabled', () => {
		spectator.component.disabled = true;
		const selectedEventSpy = jest.spyOn(spectator.component.selectedEvent, 'emit');
		spectator.component.value = 'test';
		expect(selectedEventSpy).not.toHaveBeenCalled();
	});

	it('should set value and call onChange when writeValue is called', () => {
		spectator.component.writeValue('test');
		expect(spectator.component.value).toBe('test');
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
		spectator.component['_change']('value');
		expect(fn).toHaveBeenCalledWith('value');
	});

	it('should register onTouched function', () => {
		const fn = jest.fn();
		spectator.component.registerOnTouched(fn);
		spectator.component['_touched']();
		expect(fn).toHaveBeenCalled();
	});

	it('should add selected class to the selected option', () => {
		spectator.component.value = 'test';
		spectator.setInput('options', [{ value: 'test', label: 'Test' }]);
		spectator.component.ngAfterViewInit();
		setTimeout(() => {
			expect(spectator.component['brSelect'].nativeElement.querySelector('.selected')).toBeTruthy();
		});
	});

	it('should not add selected class if value is not found', () => {
		jest.spyOn(spectator.component['brSelect'].nativeElement, 'querySelector').mockReturnValue(null);
		spectator.component['_populateItemSelected']();
		expect(spectator.component['brSelect'].nativeElement.querySelector('.selected')).toBeNull();
	});

	it('should call the setSelected function if you have a click event on an option', () => {
		const setSelectedSpy = jest.spyOn(spectator.component, 'setSelected');
		spectator.component.disabled = false;
		spectator.setInput('options', [{ value: 'test', label: 'Test' }]);
		spectator.component['brSelect'].nativeElement.querySelector('.br-item').click();
		expect(setSelectedSpy).toHaveBeenCalled();
	});
});
