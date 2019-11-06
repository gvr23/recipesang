import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../shared/services/external/auth.service';
import {Observable, Subscription} from 'rxjs';
import {AuthInterface} from '../../shared/interfaces/response/auth.interface';
import {Router} from '@angular/router';
import {PlaceholderDirective} from '../../shared/directives/placeholder.directive';
import {ModalComponent} from '../../shared/components/modal/modal.component';
import {Store} from '@ngrx/store';
import * as fromApp from '../../reducers/app.reducers';
import * as AuthActions from '../../actions/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) loginForm: NgForm;
  @ViewChild(PlaceholderDirective, { static: false }) placeHolder: PlaceholderDirective;
  storeSub: Subscription;
  loginMode = false;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private factoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
     this.storeSub = this.store.select('AuthReducer').subscribe(authState => {
       this.isLoading = authState.loading;
       this.error = authState.loginErrorMessage;
       if (this.error) {this.onShowError(this.error);}
    });
  }

  ngOnDestroy(): void { this.storeSub.unsubscribe(); }

  onSubmit = () => {
    const value = this.loginForm.value;
    if (!this.loginMode) {
      /*this.signUpSubscription = this.authService.signUP(value.email, value.password);*/
      this.store.dispatch(new AuthActions.SignupStart({email: value.email, password: value.password}));
    } else {
      /*this.signUpSubscription = this.authService.login(value.email, value.password);*/
      this.store.dispatch(new AuthActions.LoginStart({email: value.email, password: value.password}));
    }
   /* this.signUpSubscription.subscribe(
      success => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error => {
        this.error = error;
        this.isLoading = false;
        this.onShowError(this.error);
      });*/
    this.loginForm.reset();
  }
  onSwitchMode = () => this.loginMode = !this.loginMode;
  onShowError = (errorMessage: string) => {
    this.placeHolder.viewContainerRef.clear();
    const modalFactory = this.factoryResolver.resolveComponentFactory(ModalComponent);
    const componentRef = this.placeHolder.viewContainerRef.createComponent(modalFactory);
    componentRef.instance.message = errorMessage;
  }
}

