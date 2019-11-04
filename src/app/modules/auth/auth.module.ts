import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthComponent} from './auth.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {PlaceholderDirective} from '../../shared/directives/placeholder.directive';

@NgModule({
  declarations: [AuthComponent, PlaceholderDirective],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule.forChild([{path: 'auth', component: AuthComponent}])]
})
export class AuthModule {}
