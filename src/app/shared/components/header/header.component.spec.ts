import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

describe('HeaderComponent', () => {
	let spectator: Spectator<HeaderComponent>;
	const createComponent = createComponentFactory({
		component: HeaderComponent,
		schemas: [NO_ERRORS_SCHEMA],
		providers: [provideRouter([])],
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should display the logo', () => {
		const logo = spectator.query('img[alt="Logo UFU"]');
		expect(logo).toBeTruthy();
	});

	it('should display the correct header sign', () => {
		const headerSign = spectator.query('.header-sign');
		expect(headerSign).toHaveText('UFU - Universidade Federal de Uberlândia');
	});

  it('should log out when the logout method is called', () => {
    jest.spyOn(spectator.component.authService, 'logout');
    spectator.component.logout();
    expect(spectator.component.authService.logout).toHaveBeenCalled();
  });
});
