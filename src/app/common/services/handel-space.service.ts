import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandelSpaceService {

  // constructor() { }

  public handelSpace(event: KeyboardEvent):void{


    let element = event.target as HTMLElement;

    if((element.getAttribute('svgicon') === 'icon-len' && !element.className.includes('ic-dis'))
      || (element.getAttribute('data-mat-icon-name') === 'icon-len' && !element.className.includes('ic-dis'))
      || (element.getAttribute('ng-reflect-svg-icon') === 'info' && !element.className.includes('ic-dis'))
      || (element.getAttribute('ng-reflect-svg-icon') === 'icon-len' && !element.className.includes('ic-dis'))
      || (element.getAttribute('svgicon') === 'icon-print-delivery' && !element.className.includes('ic-dis'))
      || (element.getAttribute('ng-reflect-svg-icon') === 'icon-print-delivery' && !element.className.includes('ic-dis'))
      || (element.getAttribute('data-mat-icon-name') === 'info' && !element.className.includes('ic-dis'))
      ||  element.className.includes('mat-checkbox-layout')
      ||  element.className.includes('ant-pagination-prev')
      ||  element.className.includes('ant-pagination-next')
      ||  element.className.includes('ant-tabs-tab')
      ||  element.className.includes('enable-btn-search')
      ||  element.className.includes('ant-pagination-item')
      ||  element.className.includes('btn-oke')
      || element.textContent === 'close'){
      event.preventDefault();

      element.click();

      return;
    }

    // if(element.className.includes('missing-item') || element.className.includes('instruction-status') || element.className.includes('confirmed-state')){
    //   let elementChild = element.getElementsByTagName('a');

    // }



  }
}
