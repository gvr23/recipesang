import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../shared/models/ingredient.model';
import {IngredientService} from '../../shared/services/ingredient.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {SelectIngredientIndex, StartEdit} from '../../actions/shopping.actions';
import {AppState} from '../../shared/interfaces/app-state.interface';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  ingredientsSubscription: Subscription;

  constructor(private ingredientService: IngredientService, private store: Store<AppState>) { }

  ngOnInit() {
    /*this.ingredients = this.ingredientService.getIngredients();*/
    this.ingredients = this.store.select('ShoppingList');
    // tslint:disable-next-line:max-line-length
    /*this.ingredientsSubscription = this.ingredientService.ingredientUpdatedSubject.subscribe((ingredientsUpdated: Ingredient[]) => this.ingredients = ingredientsUpdated);*/
  }
  /*onDeleteItemClicked = (index: number) => this.ingredientService.deleteIngredientClicked(index);*/
  onEdit  = (index: number) => {
    /*this.store.dispatch(new SelectIngredientIndex(index));*/
    this.store.dispatch(new StartEdit(index));
    /*this.ingredientService.editingStarted.next(index);*/
  }
  ngOnDestroy(): void {  }
}
