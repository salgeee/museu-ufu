import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '@app/core/auth/services/auth.service';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MenuService } from '@app/core/services/menu.service';
import { BarraBrasilComponent } from '../barra-brasil/barra-brasil.component';

/**
 * Componente HeaderComponent é responsável por exibir o cabeçalho da aplicação.
 * @example
 * <app-header></app-header>
 * @public
 * {@link https://www.gov.br/ds/components/header?tab=desenvolvedor|Documentação oficial}
 */
@Component({
	selector: 'app-header',
	standalone: true,
	imports: [NgOptimizedImage, CdkMenuModule, BarraBrasilComponent],
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

	toggleMenu() {
		this._menuService.toggle();
	}

	logout() {
		this.authService.logout();
	}
}
