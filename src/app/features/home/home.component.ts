import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '@app/core/auth/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CONTENT_BY_ROLE } from './const/content.const';
import { Role } from '../login/models/credentials.model';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	private _authService = inject(AuthService);
	content = signal('');

	constructor() {
		this._authService.credentials$.pipe(takeUntilDestroyed()).subscribe(result => {
			this.content.set(CONTENT_BY_ROLE.get(result?.role || Role.PUBLIC));
		});
	}
}
