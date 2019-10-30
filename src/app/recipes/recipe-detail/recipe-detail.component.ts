import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../../shared/models/recipe.model';
import {RecipeService} from '../../shared/services/recipe.service';
import {Ingredient} from '../../shared/models/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;

  constructor(private router: Router, private currentRoute: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.currentRoute.params.subscribe((params: Params) => {
      this.recipeDetail = this.recipeService.getRecipe(+params.id);
      this.id = +params.id;
    });
  }

  addIngredientToSl = () => {
    this.recipeService.addToShoppingList(this.recipeDetail.ingredients);
    this.router.navigate(['/shopping']);
  }
  onEditRecipe = () => { this.router.navigate(['edit'], { relativeTo: this.currentRoute }); };
  onDeleteRecipe = () => {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
