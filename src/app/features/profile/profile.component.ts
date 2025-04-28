import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemInfoComponent } from '@shared/components/item-info/item-info.component';
import { ButtonDirective } from '@shared/directives/button';
import { profileMock } from './mocks/profile.mock';

export interface Profile {
	name: string;
	socialName: string;
	cpf: string;
	email: string;
	secondaryEmail: string;
	phone: string;
	secondaryPhone: string;
	lattesLink: string;
	orcidLink: string;
	linkedinLink: string;
}

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [ItemInfoComponent, ButtonDirective, RouterLink],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent {
	data: Profile = profileMock;
}
