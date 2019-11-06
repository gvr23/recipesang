import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Recipe} from '../../../shared/models/recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../reducers/app.reducers';
import * as RecipeActions from '../../../actions/recipes.actions';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {pipe, Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;
  private recipeSub: Subscription;
  recipeForm: FormGroup;
  id: number;
  editMode = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm(this.editMode);
    });
  }

  ngOnDestroy(): void {
    /*this.storeSub.unsubscribe();*/
    /*this.recipeSub.unsubscribe();*/
  }

  private initForm = (editing: boolean) => {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (editing) {
      let editingRecipe: Recipe = null;
      this.store.select('RecipesReducer').pipe(
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })).subscribe(recipe => editingRecipe = recipe);
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
  };
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
        /*this.recipeService.updateRecipe(this.id, newRecipe);*/
        this.store.dispatch(new RecipeActions.UpdateRecipe({index: this.id, recipe: newRecipe}));
      } else {
        /*this.recipeService.addRecipe(newRecipe);*/
        this.store.dispatch(new RecipeActions.AddRecipe(newRecipe));
        this.store.select('RecipesReducer').pipe(
          take(1),
          map(recipesState => recipesState.recipes),
          tap(recipes => {
            this.id = recipes.length - 1;
            this.router.navigate(['/recipes', this.id]);
          })
        ).subscribe();
      }
      this.recipeForm.reset();
    }
  };
  getIngredients = () => (this.recipeForm.get('recipeIngredients') as FormArray);
  onAddIngredient = () => {
    this.getIngredients().push(new FormGroup({
      name: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  };
  onDeleteIngredient = (num: number) => this.getIngredients().removeAt(num);
  onClear = () => this.recipeForm.reset();
  onCancel = () => {
    if (this.editMode) {
      this.router.navigate(['/recipes', this.id]);
    } else {
      this.onClear();
    }
  };
}
