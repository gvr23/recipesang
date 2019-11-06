import {Recipe} from '../shared/models/recipe.model';
import * as RecipesActions from '../actions/recipes.actions';

export interface RecipesState {
  recipes: Recipe[];
  selectedRecipeIndex: number;
}

const INITIAL_STATE: RecipesState = {
  recipes: null,
  selectedRecipeIndex: -1
}

export function RecipesReducer(state = INITIAL_STATE, action: RecipesActions.RecipesActions) {
  switch (action.type) {
    case RecipesActions.ADD_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipes = [...state.recipes];
      updatedRecipes[state.selectedRecipeIndex] = action.payload;
      return {
        ...state,
        recipes: updatedRecipes
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => index !== action.payload)
      };
    default:
      return state;
  }
}
