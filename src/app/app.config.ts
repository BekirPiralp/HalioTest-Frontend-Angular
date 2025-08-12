import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { FILTER_HANDLER } from '../components/tools/combo-box/models/tokens/filter-handler.token';
import { FilterHandler } from '../components/tools/combo-box/models/concrete/filter-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {provide: FILTER_HANDLER, useClass:FilterHandler}
  ]
};
