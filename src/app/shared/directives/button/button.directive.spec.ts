import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { ButtonDirective } from './button.directive';

describe('ButtonDirective', () => {
	let spectator: SpectatorDirective<ButtonDirective>;
	const createDirective = createDirectiveFactory(ButtonDirective);

	it('should apply primary color class by default', () => {
		spectator = createDirective(`<button br-button>Teste</button>`);
		expect(spectator.element).toHaveClass('primary');
	});

	it('should apply secondary color class when color is set to secondary', () => {
		spectator = createDirective(`<button br-button color="secondary">Teste</button>`);
		expect(spectator.element).toHaveClass('secondary');
	});

	it('should apply large size class when size is set to large', () => {
		spectator = createDirective(`<button br-button size="large">Teste</button>`);
		expect(spectator.element).toHaveClass('large');
	});

	it('should set disabled attribute when disabled is true', () => {
		spectator = createDirective(`<button br-button disabled>Teste</button>`);
		expect(spectator.element).toBeDisabled();
	});

	it('should set block class when block is true', () => {
		spectator = createDirective(`<button br-button block>Teste</button>`);
		expect(spectator.element).toHaveClass('block');
	});

	it('should set loading class when loading is true', () => {
		spectator = createDirective(`<button br-button [loading]="true">Teste</button>`);
		expect(spectator.element).toHaveClass('loading');
	});

	it('should set active class when active is true', () => {
		spectator = createDirective(`<button br-button active>Teste</button>`);
		expect(spectator.element).toHaveClass('active');
	});

	it('should set circle class when circle is true', () => {
		spectator = createDirective(`<button br-button circle>Teste</button>`);
		expect(spectator.element).toHaveClass('circle');
	});

	it('should set dark-mode class when inverted is true', () => {
		spectator = createDirective(`<button br-button inverted>Teste</button>`);
		expect(spectator.element).toHaveClass('dark-mode');
	});

	it('should create and append icon element when icon is set', () => {
		spectator = createDirective(`<button br-button icon="fa-icon" fontSet="fas" positionIcon="before" >Teste</button>`);

		spectator.directive.ngOnInit();
		const icon = spectator.query('i');
		expect(icon).toHaveClass('fas');
		expect(icon).toHaveClass('fa-icon');
	});

	it('should insert icon before text when positionIcon is before', () => {
		spectator = createDirective(`<button br-button icon="fa-icon" fontSet="fas" positionIcon="before" >Teste</button>`);
		spectator.directive.ngOnInit();
		const icon = spectator.query('i');
		expect(spectator.element.firstChild).toBe(icon);
	});

	it('should append icon after text when positionIcon is after', () => {
		spectator = createDirective(`<button br-button icon="fa-icon" fontSet="fas" positionIcon="after" >Teste</button>`);

		spectator.directive.ngOnInit();
		const icon = spectator.query('i');
		expect(spectator.element.lastChild).toStrictEqual(icon);
	});
});
