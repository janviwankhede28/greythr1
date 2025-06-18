
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent,appConfig) 
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes) ,// ✅ Router yahan se provide ho raha hai
     importProvidersFrom(FormsModule, HttpClientModule) // ✅ FormsModule yahan se provide ho raha hai
  ];




