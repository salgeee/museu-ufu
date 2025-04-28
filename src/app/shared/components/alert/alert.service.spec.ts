import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { AlertService } from './alert.service';
import { StateType } from '../../utils/get-icon-by-state.utils';

describe('AlertService', () => {
	let spectator: SpectatorService<AlertService>;
	const createService = createServiceFactory(AlertService);

	beforeEach(() => {
		spectator = createService();
	});

	it('should create the service', () => {
		expect(spectator.service).toBeTruthy();
	});

	it('should emit alert event when showAlert is called', () => {
		const alertSpy = jest.spyOn(spectator.service['_alert'], 'next');
		spectator.service.showAlert('success' as StateType, 'Test message');
		expect(alertSpy).toHaveBeenCalledWith({
			type: 'success',
			message: 'Test message',
			title: undefined,
			duration: 4000,
			autoClose: true,
			closable: true,
		});
	});

	it('should emit alert event with delay when showAlert is called with delay', () => {
		jest.useFakeTimers();
		const alertSpy = jest.spyOn(spectator.service['_alert'], 'next');
		spectator.service.showAlert('success' as StateType, 'Test message', undefined, true, 4000, true, 1000);
		jest.advanceTimersByTime(1000);
		expect(alertSpy).toHaveBeenCalledWith({
			type: 'success',
			message: 'Test message',
			title: undefined,
			duration: 4000,
			autoClose: true,
			closable: true,
		});
		jest.useRealTimers();
	});

	it('should emit clear event when clearAlerts is called', () => {
		const clearSpy = jest.spyOn(spectator.service['_clear'], 'next');
		spectator.service.clearAlerts();
		expect(clearSpy).toHaveBeenCalled();
	});

	it('should return alertEvents$ observable', () => {
		expect(spectator.service.alertEvents$).toStrictEqual(spectator.service['_alert'].asObservable());
	});

	it('should return clearEvent$ observable', () => {
		expect(spectator.service.clearEvent$).toStrictEqual(spectator.service['_clear'].asObservable());
	});
});
