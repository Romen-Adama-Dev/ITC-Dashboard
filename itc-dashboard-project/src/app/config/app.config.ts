import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, LOCALE_ID, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { es_ES, en_GB, zh_CN, provideNzI18n, NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import en from '@angular/common/locales/en';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(es);
registerLocaleData(en);
registerLocaleData(zh);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNzIcons(icons),
    // Provider dinámico para NZ_I18N según LOCALE_ID
    {
      provide: NZ_I18N,
      useFactory: () => {
        const locale = inject(LOCALE_ID);
        switch (locale) {
          case 'en':
            return en_GB;
          case 'zh':
            return zh_CN;
          default:
            return es_ES;
        }
      }
    },
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient()
  ]
};