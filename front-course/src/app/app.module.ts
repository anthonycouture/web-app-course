import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {environment} from "../environments/environment";
import {UpdateApplication} from "./core/services/update-application.service";
import {SnackBarService} from "./core/services/snack-bar.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatSnackBarModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (update: UpdateApplication) => () => {
      return update.init()
    },
    deps: [UpdateApplication],
    multi: true
  },
    {
      provide: APP_INITIALIZER,
      useFactory: (snackbar: SnackBarService) => () => {
        return snackbar.init()
      },
      deps: [SnackBarService],
      multi: true
    }],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
