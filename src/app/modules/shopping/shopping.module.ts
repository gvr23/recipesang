import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ShoppingRoutesModule} from './shopping-routes.module';
import {FormsModule} from '@angular/forms';

import {ShoppingComponent} from './shopping.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';

@NgModule({
  declarations: [
    ShoppingComponent,
    ShoppingEditComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule, ShoppingRoutesModule]
})
export class ShoppingModule {}
