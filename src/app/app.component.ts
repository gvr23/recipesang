import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/external/auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from './reducers/app.reducers';
import * as AuthActions from './actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    /*this.authService.autoLogin();*/
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
