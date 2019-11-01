import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../shared/services/external/auth.service';
import {Observable, Subscription} from 'rxjs';
import {AuthInterface} from '../shared/interfaces/response/auth.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) loginForm: NgForm;
  signUpSubscription: Observable<AuthInterface>;
  loginMode = false;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {}

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
        console.log(success);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error => {
        console.log(error);
        this.error = error;
        this.isLoading = false;
      });
    this.loginForm.reset();
  }
  onSwitchMode = () => this.loginMode = !this.loginMode;
}

