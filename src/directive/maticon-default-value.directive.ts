/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'mat-icon'
})
export class MaticonDefaultValueDirective {

  public constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.setAttribute('tabindex', '-1');
  }

}
