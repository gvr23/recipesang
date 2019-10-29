import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/models/ingredient.model';
import {IngredientService} from '../shared/services/ingredient.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  ingredientsSubscription: Subscription;

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    this.ingredients = this.ingredientService.getIngredients();
    // tslint:disable-next-line:max-line-length
    this.ingredientsSubscription = this.ingredientService.ingredientUpdatedSubject.subscribe((ingredientsUpdated: Ingredient[]) => this.ingredients = ingredientsUpdated);
  }
  /*onDeleteItemClicked = (index: number) => this.ingredientService.deleteIngredientClicked(index);*/
  onEdit  = (index: number) => this.ingredientService.editingStarted.next(index);
  ngOnDestroy(): void { this.ingredientsSubscription.unsubscribe(); }
}
