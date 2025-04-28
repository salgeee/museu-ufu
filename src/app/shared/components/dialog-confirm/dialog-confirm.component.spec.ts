import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { DialogConfirmComponent } from './dialog-confirm.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

describe('DialogConfirmComponent', () => {
	let spectator: Spectator<DialogConfirmComponent>;
	const createComponent = createComponentFactory({
		component: DialogConfirmComponent,
		providers: [
			{ provide: DIALOG_DATA, useValue: {} },
			{ provide: DialogRef, useValue: { close: jest.fn() } },
		],
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should display the default message and icon', () => {
		expect(spectator.query('p')).toHaveText('Tem certeza que deseja continuar?');
		expect(spectator.query('i')).toHaveClass('fa-exclamation-triangle');
	});

	it('should display confirm and cancel buttons with default labels', () => {
		expect(spectator.query('button[color="primary"]')).toHaveText('Confirmar');
		expect(spectator.query('button[color="secondary"]')).toHaveText('Cancelar');
	});

	it('should call onCancel when cancel button is clicked', () => {
		const onCancelSpy = jest.spyOn(spectator.component, 'onCancel');
		spectator.click(spectator.query('button[color="secondary"]'));
		expect(onCancelSpy).toHaveBeenCalled();
	});

	it('should call onConfirm when confirm button is clicked', () => {
		const onConfirmSpy = jest.spyOn(spectator.component, 'onConfirm');
		spectator.click(spectator.query('button[color="primary"]'));
		expect(onConfirmSpy).toHaveBeenCalled();
	});

	it('should close dialog with false when onCancel is called', () => {
		const dialogRef = spectator.inject(DialogRef);
		spectator.component.onCancel();
		expect(dialogRef.close).toHaveBeenCalledWith(false);
	});

	it('should close dialog with true when onConfirm is called', () => {
		const dialogRef = spectator.inject(DialogRef);
		spectator.component.onConfirm();
		expect(dialogRef.close).toHaveBeenCalledWith(true);
	});
});
