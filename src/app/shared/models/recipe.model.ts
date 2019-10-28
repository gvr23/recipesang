import {Ingredient} from './ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public ingredients: Ingredient[];
  public imagePath: string;


  constructor(name: string, description: string, ingredients: Ingredient[], imagePath: string) {
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
    this.imagePath = imagePath;
  }
}
