import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthInterface} from '../../interfaces/response/auth.interface';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private expirationTokwnTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signUP = (email: string, password: string) => {
    return this.http.post<AuthInterface>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAL3RPGv4v1LUtzXpAXjmBgYQYlUBcTzHg',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap((data) => this.handleAuthentication(data.email, data.localId, data.idToken, data.expiresIn)));
  }
  login = (email: string, password: string) => {
    return this.http.post<AuthInterface>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAL3RPGv4v1LUtzXpAXjmBgYQYlUBcTzHg',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap((data) => this.handleAuthentication(data.email, data.localId, data.idToken, data.expiresIn)));
  }
  autoLogin = () => {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }
  autoLogout = (expirationDuration: number) => {
    this.expirationTokwnTimer = setTimeout(() => this.logout(), expirationDuration);
  }
  logout = () => {
    localStorage.removeItem('userData');
    if (this.expirationTokwnTimer) {
      clearTimeout(this.expirationTokwnTimer);
    }
    this.expirationTokwnTimer = null;
    this.user.next(null);
    this.router.navigate(['/auth']);
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
    this.autoLogout(+expiresIn * 1000);
    this.user.next(user);
  }
  private handleError = (response: HttpErrorResponse) => {
    let errorMessage = 'An unknown error has occurred';
    if (!response.error || !response.error.error) {
      return throwError(errorMessage);
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
    return throwError(errorMessage);
  }
}
