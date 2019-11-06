import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthInterface} from '../../interfaces/response/auth.interface';
import {catchError, take, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';

import {environment} from '../../../../environments/environment';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../reducers/app.reducers';
import * as fromAuthActions from '../../../actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private expirationTokwnTimer: any;

  constructor(private store: Store<fromApp.AppState>) {}

  setLogoutTimer = (expirationDuration: number) => {
    this.expirationTokwnTimer = setTimeout(() => {
      this.store.dispatch(new fromAuthActions.Logout());
    }, expirationDuration);
  };
  clearLogoutTimer = () => {
    if (this.expirationTokwnTimer) {
      clearTimeout(this.expirationTokwnTimer);
    }
    this.expirationTokwnTimer = null;
  };
}
