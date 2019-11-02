import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ShoppingEditComponent } from './shopping/shopping-edit/shopping-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import {AppRoutes} from './routes.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IngredientService} from './shared/services/ingredient.service';
import {RecipeService} from './shared/services/recipe.service';
import {DropDirective} from './shared/directives/drop.directive';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StorageService} from './shared/services/external/storage.service';
import { AuthComponent } from './auth/auth.component';
import {AuthService} from './shared/services/external/auth.service';
import {AuthInterceptorService} from './shared/services/interceptors/auth-interceptor.service';
import { ModalComponent } from './shared/components/modal/modal.component';
import { PlaceholderDirective } from './shared/directives/placeholder.directive';


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    HeaderComponent,
    ShoppingComponent,
    ShoppingEditComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    DropDirective,
    AuthComponent,
    PlaceholderDirective,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  // tslint:disable-next-line:max-line-length
  providers: [IngredientService, RecipeService, StorageService, AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
