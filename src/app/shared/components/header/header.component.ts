import { ChangeDetectionStrategy, Component, inject, input, isDevMode } from '@angular/core';
import { AuthService } from '@app/core/auth/services/auth.service';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MenuService } from '@app/core/services/menu.service'
import { BarraBrasilComponent } from '../barra-brasil/barra-brasil.component';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-header',
	standalone: true,
  imports: [CdkMenuModule, BarraBrasilComponent, RouterLink],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	hideNavbar = input<boolean>(false);
	authService = inject(AuthService);
	user = this.authService.credentials;
	private _menuService = inject(MenuService);
  basePath = isDevMode() ? '' : '/museu-ufu';

	constructor() {}

	toggleMenu(): void {
		this._menuService.toggle();
	}

	logout() {
		this.authService.logout();
	}
}
