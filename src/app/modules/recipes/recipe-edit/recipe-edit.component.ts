import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Recipe} from '../../../shared/models/recipe.model';
import {RecipeService} from '../../../shared/services/recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../reducers/app.reducers';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  id: number;
  editMode = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      map(params => +params.id),
      switchMap(id => {
        this.id = id;
        this.editMode = id != null;
        return this.store.select('RecipesReducer');
      }),
      map(recipeState => recipeState.recipes.find((item, index) => index === this.id))
    ).subscribe(recipe => {
      this.initForm(this.editMode, recipe);
    });
  }

  private initForm = (editing: boolean, editingRecipe: Recipe) => {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (editing) {
      /*const editingRecipe = this.recipeService.getRecipe(this.id);*/
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
        this.id = this.recipeService.getRecipes().length - 1;
      }
      this.router.navigate(['/recipes', this.id]);
      this.recipeForm.reset();
    }
  }
  getIngredients = () => (this.recipeForm.get('recipeIngredients') as FormArray);
  onAddIngredient = () => {
    this.getIngredients().push(new FormGroup({
      name: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }
  onDeleteIngredient = (num: number) => this.getIngredients().removeAt(num);
  onClear = () => this.recipeForm.reset();
  onCancel = () => {
    if (this.editMode) {
      this.router.navigate(['/recipes', this.id]);
    } else {
      this.onClear();
    }
  }

}
