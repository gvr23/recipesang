import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Recipe} from '../models/recipe.model';
import {StorageService} from '../services/external/storage.service';
import {Injectable} from '@angular/core';
import {RecipeService} from '../services/recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<Recipe[]> {

  constructor(private storageService: StorageService, private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.storageService.fetchRecipes();
    }
    return recipes;
  }

}
