import {Component, OnDestroy, OnInit} from '@angular/core';
import {StorageService} from '../shared/services/external/storage.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../shared/services/external/auth.service';
import {Router} from '@angular/router';

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

  constructor(private storageService: StorageService, private authService: AuthService) {
  }

  ngOnInit() {
    this.fetchUserSubscription = this.authService.user.subscribe((user) => this.isAuthenticated = !!user);
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
    this.authService.logout();
  }
  onShowBurger = () => {
    this.toggle = !this.toggle;
  }
}
