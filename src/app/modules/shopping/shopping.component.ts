import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../shared/models/ingredient.model';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {StartEdit} from '../../actions/shopping.actions';
import * as fromApp from '../../reducers/app.reducers';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  ingredientsSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('ShoppingReducer');
  }
  ngOnDestroy(): void {  }

  onEdit  = (index: number) => {
    this.store.dispatch(new StartEdit(index));
  }
}
