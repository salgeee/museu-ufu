import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemInfoComponent } from '@shared/components/item-info/item-info.component';
import { InputComponent } from '@shared/components/input/input.component';
import { ButtonDirective } from '@shared/directives/button';
import { FeedbackDirective } from '@shared/directives/feedback';
import { AlertService } from '@shared/components/alert/alert.service';
import { profileMock } from '../../mocks/profile.mock';

@Component({
	selector: 'app-profile-edit',
	standalone: true,
	imports: [ItemInfoComponent, InputComponent, ReactiveFormsModule, ButtonDirective, FeedbackDirective],
	templateUrl: './profile-edit.component.html',
	styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent {
	form: FormGroup;
	data = profileMock;
	alertService = inject(AlertService);
	router = inject(Router);

	constructor() {
		this.form = new FormGroup({
			name: new FormControl({ value: this.data.name, disabled: true }, Validators.required),
			socialName: new FormControl({ value: this.data.socialName, disabled: false }, Validators.required),
			cpf: new FormControl({ value: this.data.cpf, disabled: true }, Validators.required),
			email: new FormControl({ value: this.data.email, disabled: true }, [Validators.required, Validators.email]),
			secondaryEmail: new FormControl(this.data.secondaryEmail, [Validators.email]),
			phone: new FormControl(this.data.phone, Validators.required),
			secondaryPhone: new FormControl(this.data.secondaryPhone),
			lattesLink: new FormControl(this.data.lattesLink),
			orcidLink: new FormControl(this.data.orcidLink),
			linkedinLink: new FormControl(this.data.linkedinLink),
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			console.log(this.form.value);
			this.alertService.showAlert('success', 'Dados salvos com êxito!', 'Sucesso.');
			this.router.navigate(['/perfil']);
		}
	}
}
