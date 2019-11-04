import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppRoutes} from './routes.module';
import {AuthModule} from './modules/auth/auth.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './shared/components/modal/modal.component';

import {AuthService} from './shared/services/external/auth.service';
import {AuthInterceptorService} from './shared/services/interceptors/auth-interceptor.service';
import {StoreModule} from '@ngrx/store';
import {AppReducers} from './reducers/app.reducers';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalComponent
  ],
  imports: [
    StoreModule.forRoot(AppReducers),
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
