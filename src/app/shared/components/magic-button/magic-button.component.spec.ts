import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MagicButtonComponent } from './magic-button.component';

describe('MagicButtonComponent', () => {
	let spectator: Spectator<MagicButtonComponent>;
	const createComponent = createComponentFactory(MagicButtonComponent);

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should have default values', () => {
		expect(spectator.component.icon).toBe('');
		expect(spectator.component.fontSet).toBe('fas');
		expect(spectator.component.size).toBe('medium');
		expect(spectator.component.label).toBe('');
	});

	it('should set icon correctly', () => {
		spectator.component.icon = 'fa-magic';
		expect(spectator.component.icon).toBe('fa-magic');
	});

	it('should set fontSet correctly', () => {
		spectator.component.fontSet = 'fab';
		expect(spectator.component.fontSet).toBe('fab');
	});

	it('should set size correctly', () => {
		spectator.component.size = 'large';
		expect(spectator.component.size).toBe('large');
	});

	it('should set label correctly', () => {
		spectator.component.label = 'Click Here';
		expect(spectator.component.label).toBe('Click Here');
	});

	it('should handle empty label', () => {
		spectator.component.label = '';
		expect(spectator.component.label).toBe('');
	});

	it('should handle undefined size', () => {
		spectator.component.size = undefined;
		expect(spectator.component.size).toBeUndefined();
	});

	it('should display the label when icon is not provided', () => {
		spectator.setInput('label', 'Click Me');
		spectator.setInput('icon', null);
		spectator.detectChanges();
		expect(spectator.query('button')).toHaveText('Click Me');
		expect(spectator.query('i')).toBeNull();
	});

	it('should display the icon when provided', () => {
		spectator.setInput('icon', 'fa-icon');
		spectator.setInput('fontSet', 'fa');
		spectator.detectChanges();
		expect(spectator.query('i')).toHaveClass('fa-icon fa');
		expect(spectator.query('button')).not.toHaveText('Click Me');
	});

	it('should have circle class when icon is provided', () => {
		spectator.setInput('icon', 'fa-icon');
		spectator.detectChanges();
		expect(spectator.query('button')).toHaveClass('circle');
	});

	it('should not have circle class when icon is not provided', () => {
		spectator.setInput('icon', null);
		spectator.detectChanges();
		expect(spectator.query('button')).not.toHaveClass('circle');
	});

	it('should set aria-label attribute correctly', () => {
		spectator.setInput('label', 'Click Me');
		spectator.detectChanges();
		expect(spectator.query('button')).toHaveAttribute('aria-label', 'Click Me');
	});
});
