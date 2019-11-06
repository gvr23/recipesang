import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../external/auth.service';
import {exhaustMap, map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../reducers/app.reducers';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('AuthReducer').pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap(user => {
        if (user) {
          const modifiedRequest = req.clone({params: new HttpParams().set('auth', user.token)});
          return next.handle(modifiedRequest);
        }
        return next.handle(req);
      }));
   /* return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (user) {
          const modifiedRequest = req.clone({params: new HttpParams().set('auth', user.token)});
          return next.handle(modifiedRequest);
        }
        return next.handle(req);
      }));*/
  }
}
