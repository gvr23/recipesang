import {Ingredient} from '../models/ingredient.model';
import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';


export class IngredientService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoe', 2)
  ];
  /*ingredientsUpdateEmitter = new EventEmitter<Ingredient[]>();*/
  ingredientUpdatedSubject = new Subject<Ingredient[]>();

  getIngredients = () => this.ingredients.slice();
  addIngredient = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient);
    this.ingredientUpdatedSubject.next(this.ingredients.slice());
  }
  deleteIngredient = () => {
    this.ingredients.splice(this.ingredients.length - 1, 1);
    this.ingredientUpdatedSubject.next(this.getIngredients());
  }
  deleteIngredientClicked = (index: number) => {
    this.ingredients.splice(index, 1);
    this.ingredientUpdatedSubject.next(this.getIngredients());
  }
}
