import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from '../../../shared/services/recipe.service';
import {Recipe} from '../../../shared/models/recipe.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesSubscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.getRecipesSubscription();
  }
  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }

  // tslint:disable-next-line:max-line-length
  getRecipesSubscription = () => this.recipesSubscription = this.recipeService.getRecipesEmitter.subscribe((recipesUpdated: Recipe[]) => this.recipes = recipesUpdated);
}
