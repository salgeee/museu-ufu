import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { BreadcrumbComponent } from './breadcrumb.component';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, UrlCreationOptions, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { NgClass } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

class MockServices {
	public events = of(new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login'));

	createUrlTree(commands: any[], navigationExtras?: UrlCreationOptions): UrlTree {
		return new UrlTree();
	}

	serializeUrl(url: UrlTree): string {
		return '';
	}
}

describe('BreadcrumbComponent', () => {
	let spectator: Spectator<BreadcrumbComponent>;
	const createComponent = createComponentFactory({
		component: BreadcrumbComponent,
		mocks: [],
		imports: [NgClass, RouterLink],
		schemas: [NO_ERRORS_SCHEMA],
		providers: [
			{ provide: Router, useClass: MockServices },
			{
				provide: ActivatedRoute,
				useValue: {
					root: {
						firstChild: {
							snapshot: {
								routeConfig: { path: 'mock-path' },
								data: { breadCrumb: 'Mock Breadcrumb' },
							},
							children: [],
							firstChild: {
								snapshot: {
									routeConfig: { path: 'mock-path-2' },
									data: { breadCrumb: 'Mock Breadcrumb 2' },
								},
								children: [],
								firstChild: null,
							},
						},
					},
				},
			},
		],
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should create a new instance of BRBreadcrumb after view init', () => {
		spectator.component.setNewInstance = jest.fn();
		spectator.component.ngAfterViewInit();
		expect(spectator.component.setNewInstance).toHaveBeenCalled();
	});
});
