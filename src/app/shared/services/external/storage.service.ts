import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../../models/recipe.model';
import {map, tap} from 'rxjs/operators';
import {Ingredient} from '../../models/ingredient.model';

@Injectable({providedIn: 'root'})
export class StorageService {
  private API_URL = 'https://ng-course-recipe-book-4c83a.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes = () => {
    this.http.put(
      this.API_URL,
      this.recipeService.getRecipes()
    )
      .subscribe((response) => {
        console.log(response);
      });
  };
  fetchRecipes = () => {
    return this.http.get<Recipe[]>(
      this.API_URL
    ).pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      tap(response => this.recipeService.addRecipes(response))
    );
  }
}
