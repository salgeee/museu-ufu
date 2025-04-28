import { Component, inject } from '@angular/core';
import { InputComponent } from '@shared/components/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from '@shared/directives/button';
import { getUserMock } from './mocks/users.mock';
import { AlertService } from '@shared/components/alert/alert.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { Role } from './models/credentials.model';
import { FeedbackDirective } from '@shared/directives/feedback';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [InputComponent, ReactiveFormsModule, ButtonDirective, FeedbackDirective],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	router = inject(Router);
	private _alertService = inject(AlertService);
	private _authService = inject(AuthService);

	formLogin = new FormGroup({
		username: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
	});

	submit() {
		if (this.formLogin.invalid) {
			this.formLogin.markAsTouched();
			return;
		}

		getUserMock(this.formLogin.value.username, this.formLogin.value.password).subscribe({
			next: value => {
				if (value.role === Role.PUBLIC) {
					this._alertService.showAlert('warning', 'Usuário sem permissão de acesso', undefined, false, undefined, true);
				} else {
					this._alertService.clearAlerts();
					this._authService.setCredentials(value);
					this.router.navigate(['/home']);
				}
			},
			error: message => {
				this._alertService.showAlert('danger', message, undefined, false);
			},
		});
	}
}
