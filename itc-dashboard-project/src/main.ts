import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/config/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import zh from '@angular/common/locales/zh';
import es from '@angular/common/locales/es';

registerLocaleData(en);
registerLocaleData(zh);
registerLocaleData(es);

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));