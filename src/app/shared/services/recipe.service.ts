import {Recipe} from '../models/recipe.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public getRecipesEmitter = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor() {}

  addRecipes = (recipes: Recipe[]) => {
    this.recipes = [...recipes];
    this.getRecipesEmitter.next(this.getRecipes());
  }
  getRecipes = () => this.recipes.slice();
  getRecipe = (index: number) => this.recipes[index];
  addRecipe = (recipe: Recipe) => {
    this.recipes.push(recipe);
    this.getRecipesEmitter.next(this.getRecipes());
  }
  updateRecipe = (index: number, recipeUpdated: Recipe) => {
    this.recipes[index] = recipeUpdated;
    this.getRecipesEmitter.next(this.getRecipes());
  }
  deleteRecipe = (index: number) => {
    this.recipes.splice(index, 1);
    this.getRecipesEmitter.next(this.getRecipes());
  }
}
