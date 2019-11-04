import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../shared/services/external/auth.service';
import {Observable, Subscription} from 'rxjs';
import {AuthInterface} from '../../shared/interfaces/response/auth.interface';
import {Router} from '@angular/router';
import {PlaceholderDirective} from '../../shared/directives/placeholder.directive';
import {ModalComponent} from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) loginForm: NgForm;
  @ViewChild(PlaceholderDirective, { static: false }) placeHolder: PlaceholderDirective;
  signUpSubscription: Observable<AuthInterface>;
  loginMode = false;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private factoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
  }

  ngOnDestroy(): void {  }

  onSubmit = () => {
    this.error = null;
    this.isLoading = true;
    const value = this.loginForm.value;
    if (!this.loginMode) {
      this.signUpSubscription = this.authService.signUP(value.email, value.password);
    } else {
      this.signUpSubscription = this.authService.login(value.email, value.password);
    }
    this.signUpSubscription.subscribe(
      success => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error => {
        this.error = error;
        this.isLoading = false;
        this.onShowError(this.error);
      });
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

