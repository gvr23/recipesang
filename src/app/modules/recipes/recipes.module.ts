import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RecipeRoutesModule} from './recipes-routes.module';

import {RecipesComponent} from './recipes.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';

import {DropDirective} from '../../shared/directives/drop.directive';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    DropDirective
  ],
  exports: [
    DropDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RecipeRoutesModule
  ]
})
export class RecipesModule {}
