import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDrop]'
})
export class DropDirective {
  @HostBinding('class.is-active') isOpen = false;
  @HostListener('click') toggleOpen = () => this.isOpen = !this.isOpen;

}
