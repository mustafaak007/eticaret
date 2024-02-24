import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// burada da diziliş var @ ile başlayan angular kütüphaneleri daha yukarıda olmalı
// sıralama angular kütüphaneleri, bizim eklediğimiz kütüphaneler, en sonda ise dosyalar

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserAnimationsModule,
      NgxSpinnerModule,
      // SweetAlert2Module,
      ToastrModule.forRoot({
        closeButton: true,
        progressBar: true,
      })
    ),
    provideHttpClient(),
  ],
};
