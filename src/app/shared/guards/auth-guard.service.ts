import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from '../services/external/auth.service';
import {Injectable} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../../reducers/app.reducers';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild {
  isLogged = false;

  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}

  // tslint:disable-next-line:max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /*return new Promise((resolve, reject) => {
      this.authService.user.subscribe((user) => {
        this.isLogged = !!user;
        resolve(this.isLogged);
      });
    });*/
   /* return this.authService.user.pipe(
      take(1),
      map(user => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    }));*/
    return this.store.select('AuthReducer').pipe(
      take(1),
      map(authState => {
        const isAuth = !!authState.user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      }));
  }

  // tslint:disable-next-line:max-line-length
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
