import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ItemInfoComponent } from './item-info.component';

describe('ItemInfoComponent', () => {
	let spectator: Spectator<ItemInfoComponent>;
	const createComponent = createComponentFactory({
		component: ItemInfoComponent,
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should display the correct label and value', () => {
		spectator.setInput('label', 'Nome');
		spectator.setInput('value', 'João da Silva');
		spectator.detectChanges();
		expect(spectator.query('b')).toHaveText('Nome');
		expect(spectator.query('span')).toHaveText('João da Silva');
	});

	it('should use default type as text', () => {
		expect(spectator.component.type()).toBe('text');
	});

	it('should accept different input types', () => {
		spectator.setInput('type', 'email');
		spectator.setInput('value', 'teste@email');
		spectator.detectChanges();
		expect(spectator.query('a')).toHaveAttribute('href', 'mailto:teste@email');
		spectator.setInput('type', 'url');
		spectator.setInput('value', 'https://teste.com');
		spectator.detectChanges();
		expect(spectator.query('a')).toHaveAttribute('href', 'https://teste.com');
		spectator.setInput('type', 'phone');
		spectator.setInput('value', '+5538999');
		spectator.detectChanges();
		expect(spectator.query('a')).toHaveAttribute('href', 'tel:+5538999');
	});

	it('should update the label and value when inputs change', () => {
		spectator.setInput('label', 'Email');
		spectator.setInput('value', 'email@example.com');
		spectator.detectChanges();
		expect(spectator.query('b')).toHaveText('Email');
		expect(spectator.query('span')).toHaveText('email@example.com');
	});
});
