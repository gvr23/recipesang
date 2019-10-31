import {Component, OnDestroy, OnInit} from '@angular/core';
import {StorageService} from '../shared/services/external/storage.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  fetchSubscription: Subscription;

  constructor(private storageService: StorageService) { }

  ngOnInit() {}
  ngOnDestroy(): void { this.fetchSubscription.unsubscribe(); }
  onSaveRecipes = () => this.storageService.storeRecipes();
  onFetchRecipes = () => this.fetchSubscription = this.storageService.fetchRecipes().subscribe();
}
