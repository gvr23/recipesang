import {Recipe} from '../models/recipe.model';
import {Ingredient} from '../models/ingredient.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is simply a test',
      [
        new Ingredient( 'paper', 2),
        new Ingredient('pencil', 1),
        new Ingredient( 'center', 1)
      ],
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs2dWrnSQCaOu5jV5iDHTQbjHKAq4LjsV97-EVHyk381SALkdbpQ',
    ),
    new Recipe(
      'A welcome recipe',
      'This is simply a welcome recipe',
      [
        new Ingredient( 'welcome', 2),
        new Ingredient('respect', 1),
        new Ingredient( 'thankyu', 1)
      ],
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs2dWrnSQCaOu5jV5iDHTQbjHKAq4LjsV97-EVHyk381SALkdbpQ',
    )
  ];

  getRecipes = () => this.recipes.slice();
  getRecipe = (index: number) => this.recipes[index];
  addRecipe = (recipe: Recipe) => this.recipes.push(recipe);
  deleteRecipe = (index: number) => this.recipes.splice(index, 1);
}
