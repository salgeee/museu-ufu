import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { authGuard, authGuardCoordinator, authGuardStudent, AuthService } from './auth.service';
import { LocalStorageService } from '@shared/services/storage';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Credentials, Role } from '@features/login/models/credentials.model';
import { TestBed } from '@angular/core/testing';

describe('AuthService', () => {
	let spectator: SpectatorService<AuthService>;
	const createService = createServiceFactory({
		service: AuthService,
		mocks: [Router, LocalStorageService],
	});

	beforeEach(() => {
		spectator = createService();
	});

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});

	it('should set credentials on initialization if platform is browser', () => {
		const credentials: Credentials = {
			role: Role.COORDINATOR,
			accessToken: 'token',
			document: '111111111',
			fullName: 'John Due',
			username: 'johndue',
		};
		spectator.service.credentials.set(credentials);

		expect(spectator.service.credentials()).toEqual(credentials);
	});

	it('should set credentials and store them in local storage', () => {
		const credentials: Credentials = {
			role: Role.COORDINATOR,
			accessToken: 'token',
			document: '111111111',
			fullName: 'John Due',
			username: 'johndue',
		};
		spectator.service.setCredentials(credentials);
		expect(spectator.service.credentials()).toEqual(credentials);
		expect(spectator.inject(LocalStorageService).setItem).toHaveBeenCalledWith('credentials', credentials);
	});

	it('should clear credentials and remove them from local storage on logout', () => {
		spectator.service.logout();
		expect(spectator.service.credentials()).toBeNull();
		expect(spectator.inject(LocalStorageService).removeItem).toHaveBeenCalledWith('credentials');
		expect(spectator.inject(Router).navigate).toHaveBeenCalledWith(['/login']);
	});

	it('should return true if user is authenticated', () => {
		const credentials: Credentials = {
			role: Role.COORDINATOR,
			accessToken: 'token',
			document: '111111111',
			fullName: 'John Due',
			username: 'johndue',
		};
		spectator.service.setCredentials(credentials);
		expect(spectator.service.isAuthenticated).toBeTruthy();
	});

	it('should return false if user is not authenticated', () => {
		spectator.service.logout();
		expect(spectator.service.isAuthenticated).toBeFalsy();
	});

	it('should navigate to login if user is not authenticated in canActivate', () => {
		spectator.service.logout();
		expect(spectator.service.canActivate()).toBeFalsy();
		expect(spectator.inject(Router).navigate).toHaveBeenCalledWith(['/login']);
	});

	it('should allow activation if user is authenticated in canActivate', () => {
		const credentials: Credentials = {
			role: Role.COORDINATOR,
			accessToken: 'token',
			document: '111111111',
			fullName: 'John Due',
			username: 'johndue',
		};
		spectator.service.setCredentials(credentials);
		expect(spectator.service.canActivate()).toBeTruthy();
	});

	it('should navigate to login if user role does not match in canActivateByRole', () => {
		const credentials: Credentials = {
			role: Role.STUDENT,
			accessToken: 'token',
			document: '111111111',
			fullName: 'John Due',
			username: 'johndue',
		};
		spectator.service.setCredentials(credentials);
		expect(spectator.service.canActivateByRole(Role.COORDINATOR)).toBeFalsy();
		expect(spectator.inject(Router).navigate).toHaveBeenCalledWith(['/login']);
	});

	it('should allow activation if user role matches in canActivateByRole', () => {
		const credentials: Credentials = {
			role: Role.COORDINATOR,
			accessToken: 'token',
			document: '111111111',
			fullName: 'John Due',
			username: 'johndue',
		};
		spectator.service.setCredentials(credentials);
		expect(spectator.service.canActivateByRole(Role.COORDINATOR)).toBeTruthy();
	});
});

describe('AuthGuards', () => {
	let spectator: SpectatorService<AuthService>;
	const createService = createServiceFactory({
		service: AuthService,
		mocks: [Router, LocalStorageService],
	});

	beforeEach(() => {
		spectator = createService();
	});

	it('authGuard should call canActivate', async () => {
		jest.spyOn(spectator.service, 'canActivate').mockReturnValue(true);
		const route = {} as ActivatedRouteSnapshot;
		const state = {
			url: '/',
		} as RouterStateSnapshot;
		const result = await TestBed.runInInjectionContext(() => authGuard(route, state));

		expect(result).toBeTruthy();
	});

	it('authGuardStudent should call canActivateByRole with Role.STUDENT', async () => {
		const canActivateByRoleSpy = jest.spyOn(spectator.service, 'canActivateByRole').mockReturnValue(true);
		const route = {} as ActivatedRouteSnapshot;
		const state = {
			url: '/',
		} as RouterStateSnapshot;
		await TestBed.runInInjectionContext(() => authGuardStudent(route, state));
		expect(canActivateByRoleSpy).toHaveBeenCalledWith(Role.STUDENT);
	});

	it('authGuardCoordinator should call canActivateByRole with Role.COORDINATOR', async () => {
		const canActivateByRoleSpy = jest.spyOn(spectator.service, 'canActivateByRole').mockReturnValue(true);
		const route = {} as ActivatedRouteSnapshot;
		const state = {
			url: '/',
		} as RouterStateSnapshot;
		await TestBed.runInInjectionContext(() => authGuardCoordinator(route, state));
		expect(canActivateByRoleSpy).toHaveBeenCalledWith(Role.COORDINATOR);
	});
});
