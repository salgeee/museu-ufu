import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { CookieModel } from '@shared/components/cookie-bar/model/cookie.model';
import BRCookiebar from '@govbr-ds/core/dist/components/cookiebar/cookiebar';
import cookies from './content/cookies.json';

@Component({
	selector: 'app-cookie-bar',
	standalone: true,
	imports: [],
	templateUrl: './cookie-bar.component.html',
	styleUrl: './cookie-bar.component.scss',
})
export class CookieBarComponent implements AfterViewInit {
	private instance: unknown;
	private brCookieBar = inject(ElementRef);

	ngAfterViewInit(): void {
		const component = this.brCookieBar.nativeElement.querySelector('.br-cookiebar');
		const params = {
			name: 'br-cookiebar',
			component: component,
			json: cookies,
			lang: 'pt-br',
			mode: 'default',
			callback: (response: CookieModel) => this.submit(response),
		};
		this.instance = new BRCookiebar(params);
	}

	submit(response: CookieModel): void {
		console.log(response);
	}
}
