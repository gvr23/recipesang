import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../../../shared/models/recipe.model';
import {Store} from '@ngrx/store';
import {AddIngredients} from '../../../actions/shopping.actions';
import * as fromApp from '../../../reducers/app.reducers';
import * as RecipeActions from '../../../actions/recipes.actions';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.currentRoute.params.pipe(
      map(params => +params.id),
      switchMap(id => {
        this.id = id;
        return this.store.select('RecipesReducer');
      }),
      map(recipesState => recipesState.recipes.find((item, index) => index === this.id)
    )).subscribe(recipe => this.recipeDetail = recipe);
  }

  addIngredientToSl = () => {
    /*this.recipeService.addToShoppingList(this.recipeDetail.ingredients);*/
    this.store.dispatch(new AddIngredients(this.recipeDetail.ingredients));
    this.router.navigate(['/shopping']);
  }
  onEditRecipe = () => { this.router.navigate(['edit'], { relativeTo: this.currentRoute }); };
  onDeleteRecipe = () => {
    /*this.recipeService.deleteRecipe(this.id);*/
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
