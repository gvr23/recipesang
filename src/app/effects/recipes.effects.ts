import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import * as fromApp from '../reducers/app.reducers';
import * as RecipeActions from '../actions/recipes.actions';
import {Recipe} from '../shared/models/recipe.model';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

@Injectable()
export class RecipesEffects {
  private API_URL = 'https://ng-course-recipe-book-4c83a.firebaseio.com/recipes.json';

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(this.API_URL);
    }),
    map(recipes => {
      console.log('these are the reipees, ', recipes);
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }),
    map(recipes => {
      /*this.recipeService.addRecipes(response);*/
      return new RecipeActions.AddRecipes(recipes);
    })
  );

  @Effect({dispatch: false})
  storeRecipesEffect = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('RecipesReducer')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(
        this.API_URL,
        recipesState.recipes
      );
    })
  );
}
