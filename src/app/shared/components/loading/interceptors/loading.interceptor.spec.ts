import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator/jest';
import { KEY_NO_LOADING, loadingInterceptor } from './loading.interceptor';
import { LoadingService } from '../services/loading.service';
import { HttpClient, HttpParams, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { inject } from '@angular/core';

class TestHttpService {
	private http = inject(HttpClient);
	constructor() {}
	get(url: string, options?: any) {
		return this.http.get(url, options);
	}

	getNoLoading(url: string, options?: any) {
		const params = new HttpParams().set(KEY_NO_LOADING, 'true');
		return this.http.get(url, { params });
	}
}

describe('loadingInterceptor', () => {
	let spectator: SpectatorHttp<any>;
	const createHttp = createHttpFactory({
		service: TestHttpService,
		providers: [LoadingService, provideHttpClient(withInterceptors([loadingInterceptor])), provideHttpClientTesting()],
		imports: [],
	});

	beforeEach(() => {
		spectator = createHttp();
	});

	it('should set loading to false when request completes', () => {
		const loadingService = spectator.inject(LoadingService);
		spectator.service.get('/test-url').subscribe();
		spectator.controller.expectOne('/test-url').flush({});
		expect(loadingService.loadingSignal()).toBeFalsy();
	});

	it('should not set loading to true if KEY_NO_LOADING is present', () => {
		const loadingService = spectator.inject(LoadingService);
		spectator.service.getNoLoading(`/test-url`).subscribe();
		expect(loadingService.loadingSignal()).toBeFalsy();
		spectator.controller.expectOne('/test-url?noLoading=true').flush({});
		expect(loadingService.loadingSignal()).toBeFalsy();
	});

	it('should handle multiple requests correctly', () => {
		const loadingService = spectator.inject(LoadingService);
		spectator.service.get('/test-url-1').subscribe();
		spectator.service.get('/test-url-2').subscribe();
		expect(loadingService.loadingSignal()).toBeTruthy();
		spectator.controller.expectOne('/test-url-1').flush({});
		expect(loadingService.loadingSignal()).toBeTruthy();
		spectator.controller.expectOne('/test-url-2').flush({});
		expect(loadingService.loadingSignal()).toBeFalsy();
	});
});
