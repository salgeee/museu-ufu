import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { AuthService } from '@app/core/auth/services/auth.service';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MenuService } from '@app/core/services/menu.service';
import { BarraBrasilComponent } from '../barra-brasil/barra-brasil.component';

@Component({
	selector: 'app-header',
	standalone: true,
  imports: [CdkMenuModule, BarraBrasilComponent],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	hideNavbar = input<boolean>(false);
	authService = inject(AuthService);
	user = this.authService.credentials;
	private _menuService = inject(MenuService);

	constructor() {}

	toggleMenu(): void {
		this._menuService.toggle();
	}

	logout() {
		this.authService.logout();
	}
}
