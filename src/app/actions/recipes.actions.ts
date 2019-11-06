import {Action} from '@ngrx/store';
import {Recipe} from '../shared/models/recipe.model';

export const ADD_RECIPES = '[Recipes Reducer] Add Recipes';
export class AddRecipes implements Action {
  readonly type = ADD_RECIPES;
  constructor(public payload: Recipe[]) {}
}
export const ADD_RECIPE = '[Recipes Reducer] Add Recipe';
export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}
export const UPDATE_RECIPE = '[Recipes Reducer] Update Recipe';
export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: Recipe) {}
}
export const DELETE_RECIPE = '[Recipes Reducer] Delete Recipe';
export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: number) {}
}

export type RecipesActions =
  | AddRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe;
