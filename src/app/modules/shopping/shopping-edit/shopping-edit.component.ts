import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IngredientService} from '../../../shared/services/ingredient.service';
import {Ingredient} from '../../../shared/models/ingredient.model';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AddIngredient, DeleteIngredient, StopEdit, UpdateIngredient} from '../../../actions/shopping.actions';
import {AppState} from '../../../shared/interfaces/app-state.interface';


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

  constructor(private ingredientService: IngredientService, private store: Store<AppState>) {}

  ngOnInit() {
    this.onIngredientEditSubscription();
  }
  ngOnDestroy(): void {
    /*this.ingredientSubscription.unsubscribe();*/
    this.store.dispatch(new StopEdit());
  }

  onIngredientEditSubscription = () => {
    this.store.select('ShoppingList').subscribe(stateData => {
      /*this.editingSelected = reducer.selectedIngredientIndex;
      this.editingIngredient = reducer.ingredients[this.editingSelected];*/
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

   /* this.ingredientSubscription = this.ingredientService.editingStarted.subscribe((num: number) => {
      this.editingSelected = num;
      console.log('this is the num, ', num);
      this.store.select('shoppingList').subscribe(ingreds => {
        this.arr = ingreds.ingredients;
      });
      /!*this.editingIngredient = this.ingredientService.getIngredient(this.editingSelected);*!/
      console.log(this.arr, ' is the');
      this.editingIngredient = this.arr[this.editingSelected];
      if (this.editingIngredient) {
        this.submitForm.form.patchValue({
          ingredientName: this.editingIngredient.name,
          ingredientQuantity: this.editingIngredient.quantity
        });
        this.editing = true;
      }
    });*/
  }
  onAddItem = () => {
    /*const ingredient = new Ingredient(this.ingredientName.nativeElement.value, +this.ingredientQuantity.nativeElement.value);*/
    if (this.submitForm.value.ingredientName && this.submitForm.value.ingredientQuantity) {
      const ingredient = new Ingredient(this.submitForm.value.ingredientName, this.submitForm.value.ingredientQuantity);
      if (this.editing) {
        if (ingredient.name.length > 0 && ingredient.quantity > 0) {
          /*this.ingredientService.editIngredient(this.editingSelected, ingredient);*/
          this.store.dispatch(new UpdateIngredient(ingredient));
          this.editing = false;
        }
      } else {
        if (ingredient.name.length > 0 && ingredient.quantity > 0) {
          /*this.ingredientService.addIngredient(ingredient);*/
          this.store.dispatch(new AddIngredient(ingredient));
        }
      }
      this.onClearInputs();
    }
  }
  onDeleteSelectedItem = () => {
      /*this.ingredientService.deleteIngredient(+this.editingSelected);*/
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

 /* ngOnChanges(changes: SimpleChanges): void {
    this.store.select('shoppingList').pipe(take(1), tap(reducer => this.editingSelected = reducer.selectedIngredientIndex));
    console.log('this what i goy, ', this.editingSelected);
    console.log('these are the changes, ', changes);
  }

  ngAfterContentChecked(): void {
    this.store.select('shoppingList').pipe(take(1), tap(reducer => {
      console.log('the reducer is, ', reducer);
      this.editingSelected = reducer.selectedIngredientIndex;
    }));
    console.log('this what i goy, ', this.editingSelected, ' after check');
  }*/
}
