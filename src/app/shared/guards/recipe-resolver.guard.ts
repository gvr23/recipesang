import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Recipe} from '../models/recipe.model';
import {StorageService} from '../services/external/storage.service';
import {Injectable} from '@angular/core';
import {RecipeService} from '../services/recipe.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../reducers/app.reducers';
import {map, take, tap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<Recipe[]> {
  recipes: Recipe[];

  constructor(
    private storageService: StorageService,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    this.store.select('RecipesReducer').pipe(
      take(1),
      map(recipesState => recipesState.recipes),
      tap( (recipes: Recipe[]) => {
        this.recipes = recipes;
        console.log('the recipes are, ', recipes);
      })
    ).subscribe();
    if (this.recipes.length === 0) {
      return this.storageService.fetchRecipes();
    }
    return this.recipes;
  }

}
