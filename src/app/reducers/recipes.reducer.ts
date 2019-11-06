import {Recipe} from '../shared/models/recipe.model';
import * as RecipesActions from '../actions/recipes.actions';

export interface RecipesState {
  recipes: Recipe[];
}

const INITIAL_STATE: RecipesState = {
  recipes: null
};

export function RecipesReducer(state = INITIAL_STATE, action: RecipesActions.RecipesActions) {
  switch (action.type) {
    case RecipesActions.ADD_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipesActions.ADD_RECIPE:
      if (state.recipes) {
        return {
          ...state,
          recipes: [...state.recipes, action.payload]
        };
      } else {
        return {
          ...state,
          recipes: [action.payload]
        };
      }
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {...state.recipes[action.payload.index], ...action.payload.recipe};
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
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
