import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
	let spectator: SpectatorService<LoadingService>;
	const createService = createServiceFactory(LoadingService);

	beforeEach(() => {
		spectator = createService();
	});

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});

	it('should set loadingSignal to true when loading is true', () => {
		spectator.service.setLoading(true, 'test-url');
		expect(spectator.service.loadingSignal()).toBeTruthy();
	});

	it('should add url to loadingMap when loading is true', () => {
		spectator.service.setLoading(true, 'test-url');
		expect(spectator.service.loadingMap.has('test-url')).toBeTruthy();
	});

	it('should remove url from loadingMap when loading is false', () => {
		spectator.service.setLoading(true, 'test-url');
		spectator.service.setLoading(false, 'test-url');
		expect(spectator.service.loadingMap.has('test-url')).toBeFalsy();
	});

	it('should set loadingSignal to false when loadingMap is empty', () => {
		spectator.service.setLoading(true, 'test-url');
		spectator.service.setLoading(false, 'test-url');
		expect(spectator.service.loadingSignal()).toBeFalsy();
	});

	it('should handle undefined url by using default', () => {
		spectator.service.setLoading(true);
		expect(spectator.service.loadingMap.has('default')).toBeTruthy();
		spectator.service.setLoading(false);
		expect(spectator.service.loadingMap.has('default')).toBeFalsy();
	});

	it('should not set loadingSignal to false if there are other loading requests', () => {
		spectator.service.setLoading(true, 'test-url-1');
		spectator.service.setLoading(true, 'test-url-2');
		spectator.service.setLoading(false, 'test-url-1');
		expect(spectator.service.loadingSignal()).toBeTruthy();
	});

	it('should set loadingSignal to false if all loading requests are completed', () => {
		spectator.service.setLoading(true, 'test-url-1');
		spectator.service.setLoading(true, 'test-url-2');
		spectator.service.setLoading(false, 'test-url-1');
		spectator.service.setLoading(false, 'test-url-2');
		expect(spectator.service.loadingSignal()).toBeFalsy();
	});
});
