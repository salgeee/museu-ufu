import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  isDevMode,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';

import { routes } from '@app/app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { globalInterceptor } from '@core/interceptors/global-http.interceptor';
import { loadingInterceptor } from '@shared/components/loading/interceptors/loading.interceptor';
import { NoopScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { DEFAULT_DIALOG_CONFIG, DIALOG_SCROLL_STRATEGY } from '@angular/cdk/dialog';
import { registerLocaleData } from '@angular/common';
import { CustomPageTitleStrategy } from '@core/strategy/title.strategy';
import localePt from '@angular/common/locales/pt';
import {authInterceptor} from '@core/auth/interceptors/auth.interceptor';


registerLocaleData(localePt);

export function scrollFactory(overlay: Overlay): () => NoopScrollStrategy {
  return () => overlay.scrollStrategies.noop();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([globalInterceptor, authInterceptor, loadingInterceptor]), withFetch()),
    provideAnimationsAsync(),
    provideEnvironmentNgxMask(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:3000',
    }),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    {
      provide: DEFAULT_DIALOG_CONFIG,
      useValue: { panelClass: 'dialog', hasBackdrop: true, autoFocus: false },
    },
    { provide: TitleStrategy, useClass: CustomPageTitleStrategy },
    {
      provide: DIALOG_SCROLL_STRATEGY,
      useFactory: scrollFactory,
      deps: [Overlay],
    }],
};
