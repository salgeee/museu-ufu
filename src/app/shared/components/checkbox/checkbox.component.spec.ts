import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
	let spectator: Spectator<CheckboxComponent>;
	const createComponent = createComponentFactory({
		component: CheckboxComponent,
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should emit valueChange event when checkbox value changes', () => {
		const valueChangeSpy = jest.spyOn(spectator.component.valueChange, 'emit');
		spectator.component.onChangeCheck({ target: { checked: true } } as unknown as Event);
		expect(valueChangeSpy).toHaveBeenCalledWith(true);
	});

	it('should not change value if checkbox is disabled', () => {
		spectator.component.disabled = true;
		spectator.component.value = false;
		spectator.component.onChangeCheck({ target: { checked: true } } as unknown as Event);
		expect(spectator.component.value).toBeFalsy();
	});

	it('should set value to true when checkbox is checked', () => {
		spectator.component.value = false;
		spectator.component.onChangeCheck({ target: { checked: true } } as unknown as Event);
		expect(spectator.component.value).toBeTruthy();
	});

	it('should set value to false when checkbox is unchecked', () => {
		spectator.component.value = true;
		spectator.component.onChangeCheck({ target: { checked: false } } as unknown as Event);
		expect(spectator.component.value).toBeFalsy();
	});

	it('should apply disabled class when checkbox is disabled', () => {
		spectator.component.disabled = true;
		spectator.detectChanges();
		expect(spectator.element).toHaveClass('disabled');
	});

	it('should not apply disabled class when checkbox is enabled', () => {
		spectator.component.disabled = false;
		spectator.detectChanges();
		expect(spectator.element).not.toHaveClass('disabled');
	});

	it('should apply state class when state is set', () => {
		spectator.setInput('state', 'valid');
		spectator.detectChanges();
		expect(spectator.element).toHaveClass('valid');
	});

	it('should not apply state class when state is empty', () => {
		spectator.component.state = '';
		spectator.detectChanges();
		expect(spectator.element).not.toHaveClass('valid');
		expect(spectator.element).not.toHaveClass('invalid');
	});
});
