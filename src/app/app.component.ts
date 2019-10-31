import {Component, OnDestroy, OnInit} from '@angular/core';
import {StorageService} from './shared/services/external/storage.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  fetchSubscription: Subscription;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void { this.fetchSubscription = this.storageService.fetchRecipes().subscribe(); }
  ngOnDestroy(): void { this.fetchSubscription.unsubscribe(); }
}
