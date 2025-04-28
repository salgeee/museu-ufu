import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '@app/core/auth/services/auth.service';
import { CdkMenuModule } from '@angular/cdk/menu';
import { RouterLink } from '@angular/router';

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
	imports: [NgOptimizedImage, CdkMenuModule, RouterLink],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	hideNavbar = input<boolean>(false);
	authService = inject(AuthService);
	user = this.authService.credentials;

	constructor() {}

	logout() {
		this.authService.logout();
	}
}
