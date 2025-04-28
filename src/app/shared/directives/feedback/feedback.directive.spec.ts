import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { FeedbackDirective } from './feedback.directive';

describe('FeedbackDirective', () => {
	let spectator: SpectatorDirective<FeedbackDirective>;
	const createDirective = createDirectiveFactory(FeedbackDirective);

	it('should create the directive', () => {
		spectator = createDirective(`<span br-feedback>Teste</span>`);
		expect(spectator.element).toHaveClass('feedback');
		expect(spectator.element).toHaveAttribute('role', 'alert');
		expect(spectator.element).toHaveText('Teste');
	});

	it('should apply the state class to the element', () => {
		spectator = createDirective(`<span br-feedback state="success"></span>`);
		expect(spectator.element).toHaveClass('success');
	});

	it('should propagate the state class to the parent element', () => {
		spectator = createDirective(`<span br-feedback state="success"></span>`);
		expect(spectator.element.parentElement).toHaveClass('success');
	});

	it('should not propagate the state class to the parent element when noPropagateState is true', () => {
		spectator = createDirective(`<span br-feedback state="success" noPropagateState></span>`);
		expect(spectator.element.parentElement).not.toHaveClass('success');
	});

	it('should create and append the icon element based on the state', () => {
		spectator = createDirective(`<span br-feedback state="success"></span>`);
		const icon = spectator.query('i');
		expect(icon).toHaveClass('fas');
		expect(icon).toHaveClass('fa-check-circle'); // Assuming getIconByStateUtils('success') returns 'fa-check-circle'
	});

	it('should remove the state class from the parent element on destroy', () => {
		spectator = createDirective(`<span br-feedback state="success"></span>`);
		spectator.directive.ngOnDestroy();
		expect(spectator.element.parentElement).not.toHaveClass('success');
	});

	it('should remove the state class from the element on destroy', () => {
		spectator = createDirective(`<span br-feedback state="success"></span>`);
		spectator.directive.ngOnDestroy();
		expect(spectator.element).not.toHaveClass('success');
	});
});
