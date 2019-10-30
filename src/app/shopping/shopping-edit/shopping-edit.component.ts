import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IngredientService} from '../../shared/services/ingredient.service';
import {Ingredient} from '../../shared/models/ingredient.model';
import {NgForm} from '@angular/forms';
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

  constructor(private ingredientService: IngredientService) {}

  ngOnInit() {
    this.onIngredientEditSubscription();
  }
  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }

  onIngredientEditSubscription = () => {
    this.ingredientSubscription = this.ingredientService.editingStarted.subscribe((num: number) => {
      this.editingSelected = num;
      this.editingIngredient = this.ingredientService.getIngredient(this.editingSelected);
      if (this.editingIngredient) {
        this.submitForm.form.patchValue({
          ingredientName: this.editingIngredient.name,
          ingredientQuantity: this.editingIngredient.quantity
        });
        this.editing = true;
      }
    });
  }
  onAddItem = () => {
    /*const ingredient = new Ingredient(this.ingredientName.nativeElement.value, +this.ingredientQuantity.nativeElement.value);*/
    if (this.submitForm.value.ingredientName && this.submitForm.value.ingredientQuantity) {
      const ingredient = new Ingredient(this.submitForm.value.ingredientName, this.submitForm.value.ingredientQuantity);
      if (this.editing) {
        if (ingredient.name.length > 0 && ingredient.quantity > 0) {
          this.ingredientService.editIngredient(this.editingSelected, ingredient);
          this.editing = false;
        }
      } else {
        if (ingredient.name.length > 0 && ingredient.quantity > 0) {
          this.ingredientService.addIngredient(ingredient);
        }
      }
      this.onClearInputs();
    }
  }
  onDeleteSelectedItem = () => {
    if (Number.isInteger(this.editingSelected)) {
      this.ingredientService.deleteIngredient(+this.editingSelected);
      this.onClearInputs();
    }
  }
  onClearInputs = () => {
    this.editingSelected = null;
    this.editing = false;
    this.editingIngredient = null;
    this.submitForm.reset();
  }
}
