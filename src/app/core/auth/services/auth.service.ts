import { computed, inject, Injectable, signal } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '@shared/services/storage';
import { Credentials, Role } from '@features/login/models/credentials.model';
import { toObservable } from '@angular/core/rxjs-interop';

const KEY_STORAGE = 'credentials';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private localStorage = inject(LocalStorageService);
	private router = inject(Router);
	credentials = signal<Credentials | null>(null);
	credentials$ = toObservable(this.credentials);
	isStudent = computed(() => this.credentials()?.role === Role.STUDENT);
	isCoordinator = computed(() => this.credentials()?.role === Role.COORDINATOR);
	isPublic = computed(() => !this.credentials() || this.credentials()?.role === Role.PUBLIC);

	constructor() {
		this.credentials.set(this.localStorage.getParseItem<Credentials>(KEY_STORAGE));
	}

	setCredentials(credentials: Credentials): void {
		this.credentials.set(credentials);

		this.localStorage.setItem(KEY_STORAGE, credentials);
	}

	logout(redirect = true): void {
		this.credentials.set(null);

		this.localStorage.removeItem(KEY_STORAGE);

		if (redirect) this.router.navigate(['/login']);
	}

	get isAuthenticated(): boolean {
		return !!this.credentials()?.accessToken;
	}

	canActivate(): boolean {
		if (!this.isAuthenticated) {
			this.router.navigate(['/login']);
		}
		return this.isAuthenticated;
	}

	canActivateByRole(role: Role): boolean {
		if (!this.isAuthenticated || this.credentials()?.role !== role) {
			this.router.navigate(['/login']);
			return false;
		}

		return true;
	}
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	return inject(AuthService).canActivate();
};

export const authGuardStudent: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	return inject(AuthService).canActivateByRole(Role.STUDENT);
};

export const authGuardCoordinator: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	return inject(AuthService).canActivateByRole(Role.COORDINATOR);
};
