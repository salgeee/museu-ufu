import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './services/loading.service';

describe('LoadingComponent', () => {
	let spectator: Spectator<LoadingComponent>;
	const createComponent = createComponentFactory({
		component: LoadingComponent,
		providers: [LoadingService],
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});
});
