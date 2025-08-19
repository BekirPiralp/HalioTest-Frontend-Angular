import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FILTER_HANDLER } from '../components/tools/combo-box/models/tokens/filter-handler.token';
import { FilterHandler } from '../components/tools/combo-box/models/concrete/filter-handler';
import { dateInterceptor } from '../interceptors/date-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([dateInterceptor])),
    {provide: FILTER_HANDLER, useClass:FilterHandler}
  ]
};
