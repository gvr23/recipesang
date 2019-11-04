import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ShoppingComponent} from './shopping.component';

const routes: Routes = [
  {path: '', component: ShoppingComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutesModule {}
