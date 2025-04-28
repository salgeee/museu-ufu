import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ButtonDirective } from '@shared/directives/button';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-not-found',
	standalone: true,
	imports: [NgOptimizedImage, ButtonDirective, RouterLink],
	templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
	back() {
		history.back();
	}
}
