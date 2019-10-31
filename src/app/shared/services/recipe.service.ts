import {Recipe} from '../models/recipe.model';
import {Ingredient} from '../models/ingredient.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {IngredientService} from './ingredient.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public getRecipesEmitter = new Subject<Recipe[]>();
 /* private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is simply a test',
      [
        new Ingredient('paper', 2),
        new Ingredient('pencil', 1),
        new Ingredient('center', 1)
      ],
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs2dWrnSQCaOu5jV5iDHTQbjHKAq4LjsV97-EVHyk381SALkdbpQ',
    ),
    new Recipe(
      'A welcome recipe',
      'This is simply a welcome recipe',
      [
        new Ingredient('welcome', 2),
        new Ingredient('respect', 1),
        new Ingredient('thankyu', 1)
      ],
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs2dWrnSQCaOu5jV5iDHTQbjHKAq4LjsV97-EVHyk381SALkdbpQ',
    )
  ];*/
  private recipes: Recipe[] = [];

  constructor(private ingredientService: IngredientService) {}

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
  /*deleteRecipeIngredient = (indexRecipe: number, indexIngredient: number) => {
    console.log(indexRecipe, ' is the indexRecipe');
    const recipe = this.getRecipe(indexRecipe);
    recipe.ingredients.splice(indexIngredient, 1);
    this.getRecipesEmitter.next(this.getRecipes());
  }*/
  addToShoppingList = (ingredients: Ingredient[]) => this.ingredientService.addIngredients(ingredients);
}
