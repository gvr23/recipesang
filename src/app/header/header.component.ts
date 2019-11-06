import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import {StorageService} from '../shared/services/external/storage.service';
import {AuthService} from '../shared/services/external/auth.service';
import * as fromApp from '../reducers/app.reducers';
import * as AuthActions from '../actions/auth.actions';

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

  constructor(private storageService: StorageService, private authService: AuthService, private store: Store<fromApp.AppState>) {
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
    this.storageService.storeRecipes();
    this.toggle = false;
  }
  onFetchRecipes = () => {
    this.fetchSubscription = this.storageService.fetchRecipes().subscribe();
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
