import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {StoreModule} from '@ngrx/store';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppRoutes} from './routes.module';
import {AuthModule} from './modules/auth/auth.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './shared/components/modal/modal.component';

import {AuthService} from './shared/services/external/auth.service';
import {AuthInterceptorService} from './shared/services/interceptors/auth-interceptor.service';

import * as fromApp from './reducers/app.reducers';
import {AuthEffects} from './effects/auth.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalComponent
  ],
  imports: [
    StoreModule.forRoot(fromApp.AppReducers),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    EffectsModule.forRoot([AuthEffects]),
    BrowserModule,
    AppRoutes,
    AuthModule
  ],
  // tslint:disable-next-line:max-line-length
  providers: [AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
