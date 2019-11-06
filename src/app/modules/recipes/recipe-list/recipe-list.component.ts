import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../../../shared/models/recipe.model';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../reducers/app.reducers';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    /*this.recipes = this.recipeService.getRecipes();*/
    this.getRecipesSubscription();
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }

  // tslint:disable-next-line:max-line-length
  getRecipesSubscription = () => {
    this.recipesSubscription = this.store.select('RecipesReducer')
      .pipe(
        map(recipeReducerState => recipeReducerState.recipes))
      .subscribe(recipes => this.recipes = recipes);
  }
}
