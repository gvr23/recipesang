import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import * as AuthActions from '../actions/auth.actions';
import {AuthInterface} from '../shared/interfaces/response/auth.interface';
import {environment} from '../../environments/environment';
import {User} from '../shared/models/user.model';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/external/auth.service';
import {of} from 'rxjs';

// @ts-ignore
@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  @Effect()
  authSignupStart = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP_START),
    switchMap((authData: AuthActions.SignupStart) => {
      return this.http.post<AuthInterface>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        map(resData => {
          return this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
        }),
        catchError(response => of(this.handleError(response)))
      );
    })
  );

  @Effect()
  authLoginStart = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthInterface>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        map(resData => {
          return this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
        }),
        catchError(response => of(this.handleError(response)))
      );
    })
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/recipes']);
      }
    })
  );

  @Effect()
  authAutoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return {type: 'Dummy'};
      }
      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
      if (loadedUser.token) {
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(+expirationDuration);
        return new AuthActions.AuthenticateSuccess({user: loadedUser, redirect: false});
      }
      return {type: 'Dummy'};
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.authService.clearLogoutTimer();
      this.router.navigate(['/auth']);
    })
  );

  private handleError = (response: HttpErrorResponse) => {
    let errorMessage = 'An unknown error has occurred';
    if (!response.error || !response.error.error) {
      return new AuthActions.AuthenticateFail(errorMessage);
    }
    switch (response.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Please try again later';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is invalid, please try again';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This user has been disabled';
        break;
    }
    return new AuthActions.AuthenticateFail(errorMessage);
  }
  private handleAuthentication = (email: string, localId: string, idToken: string, expiresIn: string) => {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(
      email,
      localId,
      idToken,
      expirationDate
    );
    localStorage.setItem('userData', JSON.stringify(user));
    this.authService.setLogoutTimer(+expiresIn * 1000);
    return new AuthActions.AuthenticateSuccess({user, redirect: true});
    /*localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+expiresIn * 1000);
    /!*this.user.next(user);*!/
    this.store.dispatch(new AuthActions.AuthenticateSuccess(user));*/
  }
}
