import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  { path: 'recipes', loadChildren: () => import('./modules/recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'shopping', loadChildren: () => import('./modules/shopping/shopping.module').then(m => m.ShoppingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutes {}
