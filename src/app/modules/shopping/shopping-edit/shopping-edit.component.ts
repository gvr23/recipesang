import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../../shared/models/ingredient.model';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AddIngredient, DeleteIngredient, StopEdit, UpdateIngredient} from '../../../actions/shopping.actions';
import * as fromApp from '../../../reducers/app.reducers';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) submitForm: NgForm;
  editing = false;
  editingSelected: number;
  editingIngredient: Ingredient;
  ingredientSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.onIngredientEditSubscription();
  }
  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
    this.store.dispatch(new StopEdit());
  }

  onIngredientEditSubscription = () => {
    this.ingredientSubscription = this.store.select('ShoppingReducer').subscribe(stateData => {
     if (stateData.selectedIngredientIndex > -1) {
       this.editingIngredient = stateData.editedIngredient;
       this.editingSelected = stateData.selectedIngredientIndex;
       if (this.editingIngredient) {
         this.submitForm.form.patchValue({
           ingredientName: this.editingIngredient.name,
           ingredientQuantity: this.editingIngredient.quantity
         });
         this.editing = true;
       }
     }
    });
  }
  onAddItem = () => {
    if (this.submitForm.value.ingredientName && this.submitForm.value.ingredientQuantity) {
      const ingredient = new Ingredient(this.submitForm.value.ingredientName, this.submitForm.value.ingredientQuantity);
      if (this.editing) {
        if (ingredient.name.length > 0 && ingredient.quantity > 0) {
          this.store.dispatch(new UpdateIngredient(ingredient));
          this.editing = false;
        }
      } else {
        if (ingredient.name.length > 0 && ingredient.quantity > 0) {
          this.store.dispatch(new AddIngredient(ingredient));
        }
      }
      this.onClearInputs();
    }
  }
  onDeleteSelectedItem = () => {
      this.store.dispatch(new DeleteIngredient());
      this.onClearInputs();
  }
  onClearInputs = () => {
    this.editingSelected = null;
    this.editing = false;
    this.editingIngredient = null;
    this.store.dispatch(new StopEdit());
    this.submitForm.reset();
  }
}
