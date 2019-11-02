import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutes} from './routes.module';
import {RecipesModule} from './modules/recipes/recipes.module';
import {ShoppingModule} from './modules/shopping/shopping.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { ModalComponent } from './shared/components/modal/modal.component';

import {IngredientService} from './shared/services/ingredient.service';
import {RecipeService} from './shared/services/recipe.service';
import {StorageService} from './shared/services/external/storage.service';
import {AuthService} from './shared/services/external/auth.service';
import {AuthInterceptorService} from './shared/services/interceptors/auth-interceptor.service';

import { PlaceholderDirective } from './shared/directives/placeholder.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    PlaceholderDirective,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    FormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingModule
  ],
  // tslint:disable-next-line:max-line-length
  providers: [IngredientService, RecipeService, StorageService, AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
