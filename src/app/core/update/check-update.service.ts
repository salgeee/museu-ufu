import { ApplicationRef, inject, Injectable, isDevMode } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, first, interval } from 'rxjs';
import { minutesToMsConverterUtils } from '../../shared/utils/minutes-to-ms-converter.utils';

@Injectable({
	providedIn: 'root',
})
export class CheckUpdateService {
	readonly swUpdate = inject(SwUpdate);
	appRef = inject(ApplicationRef);

	init() {
		if (isDevMode()) return;

		this.appRef.isStable.pipe(first(stable => !!stable)).subscribe(() => {
			this.verifyUpdate();
			this.setPromptUpdate();
			this.initPolling();
		});
	}

	private initPolling() {
		const everyTenMinutes$ = interval(minutesToMsConverterUtils(10));

		everyTenMinutes$.subscribe(async () => {
			await this.verifyUpdate();
		});
	}

	private async verifyUpdate() {
		try {
			const updateFound = await this.swUpdate.checkForUpdate();
			console.log(updateFound ? 'Nova versão disponível' : 'Sem novas versões');
		} catch (err) {
			console.error('Failed to check for updates:', err);
		}
	}

	private setPromptUpdate(): void {
		this.swUpdate.versionUpdates
			.pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
			.subscribe(() => {
				window.location.reload();
			});
	}
}
