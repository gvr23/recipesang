import {Ingredient} from '../models/ingredient.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoe', 2)
  ];
  ingredientUpdatedSubject = new Subject<Ingredient[]>();
  editingStarted = new Subject<number>();

  getIngredients = () => this.ingredients.slice();
  getIngredient = (index: number) => this.ingredients[index];
  addIngredient = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient);
    this.ingredientUpdatedSubject.next(this.getIngredients());
  }
  addIngredients = (ingredients: Ingredient[]) => {
    this.ingredients = [...this.ingredients, ...ingredients];
    this.ingredientUpdatedSubject.next(this.getIngredients());
  }
  editIngredient = (index: number, ingredient: Ingredient) => {
    this.ingredients[index] = ingredient;
    this.ingredientUpdatedSubject.next(this.getIngredients());
  }
  deleteIngredient = (index: number) => {
    this.ingredients.splice(index, 1);
    this.ingredientUpdatedSubject.next(this.getIngredients());
  }
}
