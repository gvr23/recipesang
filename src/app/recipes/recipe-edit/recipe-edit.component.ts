import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Recipe} from '../../shared/models/recipe.model';
import {Ingredient} from '../../shared/models/ingredient.model';
import {RecipeService} from '../../shared/services/recipe.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      console.log('the id of editing is, ', this.id);
      this.editMode = params.id != null;
      this.initForm(this.editMode);
    });
  }

  onSubmit = () => {
    if (this.recipeForm.valid) {
      const value = this.recipeForm.value;
      const newRecipe = new Recipe(
        value.recipeName,
        value.recipeDescription,
        value.recipeIngredients,
        value.recipeImagePath
      );
      if (this.editMode) {
        this.recipeService.updateRecipe(this.id, newRecipe);
      } else {
        this.recipeService.addRecipe(newRecipe);
      }
      this.recipeForm.reset();
    }
  };

  private initForm = (editing: boolean) => {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (editing) {
      const editingRecipe = this.recipeService.getRecipe(this.id);
      recipeName = editingRecipe.name;
      recipeImagePath = editingRecipe.imagePath;
      recipeDescription = editingRecipe.description;
      if (editingRecipe.ingredients) {
        editingRecipe.ingredients.forEach(item => {
          return recipeIngredients.push(
            new FormGroup({
              name: new FormControl(item.name, [Validators.required]),
              quantity: new FormControl(item.quantity, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));
        });
      }
    }
    this.recipeForm = new FormGroup({
      recipeName: new FormControl(recipeName, [Validators.required]),
      recipeImagePath: new FormControl(recipeImagePath, [Validators.required]),
      recipeDescription: new FormControl(recipeDescription, [Validators.required]),
      recipeIngredients
    });
  }
  getIngredients = () => (this.recipeForm.get('recipeIngredients') as FormArray);
  onAddIngredient = () => {
    this.getIngredients().push(new FormGroup({
      name: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }
  onDeleteIngredient = (num: number) => this.getIngredients().controls.splice(num, 1);
  onClear = () => this.recipeForm.reset();

}
