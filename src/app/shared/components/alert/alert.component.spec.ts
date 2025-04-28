import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { AlertComponent } from './alert.component';
import { AlertEvent, AlertService } from './alert.service';

describe('AlertComponent', () => {
	let spectator: Spectator<AlertComponent>;
	let alertService: AlertService;
	const createComponent = createComponentFactory({
		component: AlertComponent,
	});

	beforeEach(() => {
		spectator = createComponent();
		alertService = spectator.inject(AlertService);
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should set alert when alert event is emitted', () => {
		alertService.showAlert('success', 'Test message');

		spectator.component.ngOnInit();
		expect(spectator.component.alert().message).toEqual('Test message');
		expect(spectator.component.alert().type).toEqual('success');
	});

	it('should clear alert when clear event is emitted', () => {
		alertService.clearAlerts();
		spectator.component.ngOnInit();
		expect(spectator.component.alert()).toBeNull();
	});

	it('should hide alert when onHide is called', () => {
		spectator.component.onHide();
		expect(spectator.component.alert()).toBeNull();
	});

	it('should register close time when autoClose is true', () => {
		jest.useFakeTimers();
		const alertEvent = { type: 'success', message: 'Test message', autoClose: true, duration: 1000 } as AlertEvent;
		spectator.component['registerCloseTime'](alertEvent);
		jest.advanceTimersByTime(1000);
		expect(spectator.component.alert()).toBeNull();
		jest.useRealTimers();
	});

	it('should clear timeout when mouse enters alert', () => {
		const alertEvent = { type: 'success', message: 'Test message', autoClose: true, closeTimeId: 123 } as AlertEvent;
		jest.spyOn(window, 'clearTimeout');
		spectator.component.onMouseEnter(alertEvent);
		expect(clearTimeout).toHaveBeenCalledWith(123);
	});

	it('should re-register close time when mouse is pressed on alert', () => {
		jest.useFakeTimers();
		const alertEvent = { type: 'success', message: 'Test message', autoClose: true, duration: 1000 } as AlertEvent;
		spectator.component.onMouseDown(alertEvent);
		jest.advanceTimersByTime(1000);
		expect(spectator.component.alert()).toBeNull();
		jest.useRealTimers();
	});
});
