import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideNativeDateAdapter } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
    provideNativeDateAdapter(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angular-demo-4f7e7',
        appId: '1:74637756033:web:510de4dcd09cfd526d6f80',
        storageBucket: 'angular-demo-4f7e7.firebasestorage.app',
        apiKey: 'AIzaSyAp_TfJXCMLjzKzwrcUcWt76uTpPmrUY2o',
        authDomain: 'angular-demo-4f7e7.firebaseapp.com',
        messagingSenderId: '74637756033',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
