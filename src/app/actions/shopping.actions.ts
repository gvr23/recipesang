import {Action} from '@ngrx/store';
import {Ingredient} from '../shared/models/ingredient.model';

export const ADD_INGREDIENT = '[Shopping Reducer] Add Ingredient';
export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  payload: Ingredient;
  constructor(payload: Ingredient) {this.payload = payload; }
}
export const UPDATE_INGREDIENT = '[Shopping Reducer] Update Ingredient';
export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}
export const DELETE_INGREDIENT = '[Shopping Reducer] Delete Ingredient';
export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}
export const ADD_INGREDIENTS = '[Shopping Reducer] Add Ingredients';
export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}
export const SELECT_INGREDIENT_INDEX = '[Shopping Reducer] Select Ingredient Index';
export class SelectIngredientIndex implements Action {
  readonly type = SELECT_INGREDIENT_INDEX;
  constructor(public payload: number) {}
}
export const START_EDIT = '[Shopping Reducer] Start Edit';
export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}
export const STOP_EDIT = '[Shopping Reducer] Stop Edit';
export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | SelectIngredientIndex
  | StartEdit
  | StopEdit;
