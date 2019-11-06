import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import {AuthService} from '../shared/services/external/auth.service';
import * as fromApp from '../reducers/app.reducers';
import * as AuthActions from '../actions/auth.actions';
import * as RecipeActions from '../actions/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  fetchSubscription: Subscription;
  fetchUserSubscription: Subscription;
  toggle = false;

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.fetchUserSubscription = this.store.select('AuthReducer').pipe(
      map(authState => authState.user)
    ).subscribe(user => this.isAuthenticated = !!user);
  }

  ngOnDestroy(): void {
    this.fetchSubscription.unsubscribe();
    this.fetchUserSubscription.unsubscribe();
  }

  onSaveRecipes = () => {
    /*this.storageService.storeRecipes();*/
    this.store.dispatch(new RecipeActions.StoreRecipes());
    this.toggle = false;
  }
  onFetchRecipes = () => {
    /*this.fetchSubscription = this.storageService.fetchRecipes().subscribe();*/
    this.store.dispatch(new RecipeActions.FetchRecipes());
    this.toggle = false;
  }
  onSignOut = () => {
    this.isAuthenticated = false;
    this.toggle = false;
    this.store.dispatch(new AuthActions.Logout());
  }
  onShowBurger = () => {
    this.toggle = !this.toggle;
  }
}
