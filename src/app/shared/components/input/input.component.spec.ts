import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

describe('InputComponent', () => {
	let spectator: Spectator<InputComponent>;
	const createComponent = createComponentFactory({
		component: InputComponent,
		providers: [provideNgxMask()],
		imports: [FormsModule, NgxMaskDirective],
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should initialize BRInput instance after view init', () => {
		spectator.component.ngAfterViewInit();
		setTimeout(() => {
			expect(spectator.component.instance).toBeTruthy();
		});
	});

	it('should emit change event when input value changes', () => {
		let output;
		spectator.output('change').subscribe(result => (output = result));
		spectator.component.disabled = false;
		spectator.component.value = 'test';
		spectator.component.onChangeInput({ target: { value: 'test' } } as unknown as Event);
		expect(output).toStrictEqual('test');
	});

	it('should not emit change event when input is disabled', () => {
		spectator.component.disabled = true;
		const changeSpy = jest.spyOn(spectator.component.change, 'emit');
		spectator.component.onChangeInput({ target: { value: 'test' } } as unknown as Event);
		expect(changeSpy).not.toHaveBeenCalled();
	});

	it('should emit clickButton event when button is clicked', () => {
		const clickButtonSpy = jest.spyOn(spectator.component.clickButton, 'emit');
		spectator.component.onClickButton(new MouseEvent('click'));
		expect(clickButtonSpy).toHaveBeenCalled();
	});

	it('should not emit clickButton event when input is disabled', () => {
		spectator.component.disabled = true;
		const clickButtonSpy = jest.spyOn(spectator.component.clickButton, 'emit');
		spectator.component.onClickButton(new MouseEvent('click'));
		expect(clickButtonSpy).not.toHaveBeenCalled();
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

	it('should set _required to true when required input is true', () => {
		spectator.component.required = true;
		expect(spectator.component['_required']).toBeTruthy();
	});

	it('should set _required to false when required input is false', () => {
		spectator.component.required = false;
		expect(spectator.component['_required']).toBeFalsy();
	});

	it('should set _required to undefined when required input is undefined', () => {
		spectator.component.required = undefined;
		expect(spectator.component['_required']).toBeUndefined();
	});
});
