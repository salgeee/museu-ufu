import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { CollapseItemComponent } from './collapse-item.component';

describe('CollapseItemComponent', () => {
	let spectator: Spectator<CollapseItemComponent>;
	const createComponent = createComponentFactory({
		component: CollapseItemComponent,
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should have the correct label input', () => {
		spectator.setInput('label', 'Test Label');
		expect(spectator.component.label).toBe('Test Label');
	});

	it('should have the correct id input', () => {
		spectator.setInput('id', 'test-id');
		expect(spectator.component.id).toBe('test-id');
	});

	it('should have the expanded input set to false by default', () => {
		expect(spectator.component.expanded).toBe(false);
	});

	it('should set the expanded input correctly', () => {
		spectator.setInput('expanded', true);
		expect(spectator.component.expanded).toBe(true);
	});

	it('should render the correct label', () => {
		spectator.setInput('label', 'Test Label');
		spectator.detectChanges();
		expect(spectator.query('.header span')).toHaveText('Test Label');
	});

	it('should have the correct id attributes', () => {
		spectator.setInput('id', 'test-id');
    spectator.component.expanded = true;
		spectator.detectChanges();
		expect(spectator.query('.accordion-item')).toHaveAttribute('id', 'accordion-header-test-id');
		expect(spectator.query('.block')).toHaveAttribute('id', 'accordion-body-test-id');
		expect(spectator.query('.block')).toHaveAttribute('aria-labelledby', 'accordion-header-test-id');
	});

	it('should apply the correct class when expanded', () => {
		spectator.setInput('expanded', true);
		spectator.detectChanges();
		expect(spectator.query('.fas')).toHaveClass('fa-rotate-180');
	});

	it('should not apply the class when not expanded', () => {
		spectator.setInput('expanded', false);
		spectator.detectChanges();
		expect(spectator.query('.fas')).not.toHaveClass('fa-rotate-180');
	});
});
