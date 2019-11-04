import {Ingredient} from '../shared/models/ingredient.model';
import * as ShoppingListActions from '../actions/shopping.actions';

export interface ShoppingState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  selectedIngredientIndex: number;
}

const INITIAL_STATE: ShoppingState = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoe', 2)
  ],
  editedIngredient: null,
  selectedIngredientIndex: -1
};

export function ShoppingListReducer(state = INITIAL_STATE, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...(action.payload)]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const updateIngredients = [...state.ingredients];
      updateIngredients[state.selectedIngredientIndex] = action.payload;
      return {
        ...state,
        ingredients: updateIngredients,
        selectedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((item, i) => i !== state.selectedIngredientIndex),
        selectedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.SELECT_INGREDIENT_INDEX:
      return {
        ...state,
        selectedIngredientIndex: action.payload
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        selectedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        selectedIngredientIndex: -1,
        editedIngredient: null
      };
    default:
      return state;
  }
}
