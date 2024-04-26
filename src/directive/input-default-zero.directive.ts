/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { isNull } from 'lodash';

@Directive({
  selector: 'input[numbersDefaultZero]'
})
export class NumberDefaultZeroDirective {

  public constructor(private _el: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event']) public onInputChange(event:InputEvent):void {
    let initalValue = this._el.nativeElement.value.replace(/\s/g, '');

    if(isNaN(Number(event.data))){
      if(Number(initalValue.replace(event.data, '')) > 0){
        this.control?.control?.patchValue(Number(initalValue.replace(event.data, '')));
      }else if(this.control.name === 'quantity' && Number(initalValue.replace(event.data, '')) < 0){
        this.control?.control?.patchValue(0);
      }else{
        this.control?.control?.patchValue('',{ emitEvent: true});
      }
    }else
    if(!initalValue){
      if(this.control.name === 'quantity'){
        this.control?.control?.patchValue(0);
      }else{
        this.control?.control?.patchValue('',{ emitEvent: true});
      }
    }else if(initalValue.toString().match(/[^\w!@#$%^&*(),.?":{}[\]\`\~\_\+\=\-\/\\;'|<>]/)){
      this.control?.control?.patchValue('',{ emitEvent: true});
    }else{
      initalValue = Number(initalValue.replaceAll(',',''));
      this.control?.control?.patchValue(initalValue,{ emitEvent: true});
    }
  }

}
