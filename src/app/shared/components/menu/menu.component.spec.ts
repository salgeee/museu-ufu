import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { MenuComponent } from './menu.component';
import { AuthService } from '@app/core/auth/services/auth.service';
import { LayoutModule } from '@angular/cdk/layout';
import { LIST_MENU_BY_ROLE } from './const/list-menu';
import { Role } from '@app/features/login/models/credentials.model';
import { provideRouter, RouterLink, RouterLinkActive } from '@angular/router';
import { of } from 'rxjs';

describe('MenuComponent', () => {
	let spectator: Spectator<MenuComponent>;
	const createComponent = createComponentFactory({
		component: MenuComponent,
		providers: [
			provideRouter([]),
			mockProvider(AuthService, {
				credentials$: of({ role: Role.PUBLIC }),
			}),
		],
		imports: [LayoutModule, RouterLink, RouterLinkActive],
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should set the menu list to public if no user is logged in', () => {
		spectator.component.ngAfterViewInit();
		expect(spectator.component.list).toEqual(LIST_MENU_BY_ROLE.get(Role.PUBLIC));
	});

	it('should initialize BRMenu instance after view init', () => {
		spectator.component.ngAfterViewInit();
		setTimeout(() => {
			expect(spectator.component.instance).toBeTruthy();
		});
	});

	it('should close the menu if mobile', () => {
		spectator.component.isMobile.set(true);
		const closeMenuSpy = jest.spyOn(spectator.component, 'closeMenu');
		try {
			spectator.component.closeMenuIfMobile();
		} catch (e) {
			expect(e).toBeInstanceOf(Error);
		}
		expect(closeMenuSpy).toHaveBeenCalled();
	});

	it('should not close the menu if not mobile', () => {
		spectator.component.isMobile.set(false);
		const closeMenuSpy = jest.spyOn(spectator.component, 'closeMenu');
		try {
			spectator.component.closeMenuIfMobile();
		} catch (e) {
			expect(e).toBeInstanceOf(Error);
		}
		expect(closeMenuSpy).not.toHaveBeenCalled();
	});

	it('should close the menu', () => {
		const elementRef = spectator.component['_brMenu'];
		elementRef.nativeElement.querySelector = jest.fn().mockReturnValue({ click: jest.fn() });
		spectator.component.closeMenu();
		expect(elementRef.nativeElement.querySelector).toHaveBeenCalledWith('[data-dismiss="menu"]');
	});
});
