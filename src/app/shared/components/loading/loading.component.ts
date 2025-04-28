import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {LoadingService} from './services/loading.service';

/**
 * Componente LoadingComponent é responsável por exibir um overlay de carregamento.
 * @example
 * <app-loading></app-loading>
 *
 * @public
 * @see LoadingService
 * {@link https://www.gov.br/ds/components/loading?tab=desenvolvedor|Documentação oficial}
 */
@Component({
	selector: 'app-loading',
	standalone: true,
	imports: [],
	host: { '[class.overlay-loader]': 'showLoading()', '[class.d-none]': '!showLoading()' },
	providers: [LoadingService],
	templateUrl: './loading.component.html',
	styleUrl: './loading.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
	showLoading = computed(() => !!this.loadingService.loadingSignal());
	loadingService = inject(LoadingService);
}
