import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IngredientService} from '../../shared/services/ingredient.service';
import {Ingredient} from '../../shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('ingredientName', { static: false }) ingredientName: ElementRef;
  @ViewChild('ingredientQuantity', { static: false }) ingredientQuantity: ElementRef;

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {}

  onAddItem = () => {
    const ingredient = new Ingredient(this.ingredientName.nativeElement.value, +this.ingredientQuantity.nativeElement.value);
    if (ingredient.name.length > 0 && ingredient.quantity > 0) {
      this.ingredientService.addIngredient(ingredient);
      this.ingredientName.nativeElement.value = null;
      this.ingredientQuantity.nativeElement.value = null;
    }
  }
  onDeleteLastItem = () => this.ingredientService.deleteIngredient();
  onClearInputs = () => { this.ingredientName.nativeElement.value = null; this.ingredientQuantity.nativeElement.value = null; };
}
