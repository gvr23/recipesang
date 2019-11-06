import {ActionReducerMap} from '@ngrx/store';
import * as fromAuthReducer from './auth.reducer';
import * as fromShoppingReducer from './shopping.reducer';
import * as fromRecipesReducer from './recipes.reducer';

export interface AppState {
  ShoppingReducer: fromShoppingReducer.ShoppingState;
  AuthReducer: fromAuthReducer.AuthState;
  RecipesReducer: fromRecipesReducer.RecipesState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  ShoppingReducer: fromShoppingReducer.ShoppingListReducer,
  AuthReducer: fromAuthReducer.AuthReducer,
  RecipesReducer: fromRecipesReducer.RecipesReducer
};
