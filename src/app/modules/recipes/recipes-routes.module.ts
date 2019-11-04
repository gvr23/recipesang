import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../shared/guards/auth-guard.service';
import {RecipesComponent} from './recipes.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeResolver} from '../../shared/guards/recipe-resolver.guard';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '', canActivateChild: [AuthGuard], component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolver]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolver]}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutesModule {}
