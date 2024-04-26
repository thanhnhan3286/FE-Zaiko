import { Injectable } from '@angular/core';
import { isNull } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class HandelTabindexService {
  public selecttorValueStatic = 'input:not([disabled]):not([hidden]),.ant-tabs-tab,mat-checkbox >  label.mat-checkbox-layout'
  .concat(',.tab-index,.ng-select > input,button[color="primary"]:not([disabled],[nz-dropdown]),button[color="primary"]:not([hidden])')
  .concat(',mat-select')
  .concat(',.ant-tabs-tabpane')
  // .concat(',.missing-item,.instruction-status,.confirmed-state')
  .concat(',button:not([disabled=\"true\"]):not(.ant-pagination-item-link):not(.mat-button-disabled)')
  .concat(',button[color="mat-stroked-button"]:not([disabled=\"true\"])')
  .concat(',.btn-delete[color="warn"]:not([disabled=\"true\"])')
  // .concat(',.mat-icon[svgicon="button-edit"]:not([disabled]),.mat-icon[ng-reflect-svg-icon="button-edit"]:not([disabled])')
  .concat(',.enable-btn-search,.btn-oke,.icon-close')
  // .concat(',.mat-icon[svgicon="icon-delete-red"]:not([disabled]),.mat-icon[ng-reflect-svg-icon="icon-delete-red"]:not([disabled])')
  // .concat(',.mat-icon[svgicon="icon-cancel-white"]:not([disabled]),.mat-icon[ng-reflect-svg-icon="icon-cancel-white"]:not([disabled])')
  .concat(',.mat-icon[svgicon="icon-print-delivery"],.mat-icon[ng-reflect-svg-icon="icon-print-delivery"]')
  .concat(',.mat-icon[svgicon="icon-len"]:not([disabled]),.mat-icon[ng-reflect-svg-icon="icon-len"]:not([disabled])')
  .concat(',.mat-icon[data-mat-icon-name="icon-len"]')
  // .concat(',.mat-icon[ng-reflect-svg-icon="info-disable"]')
  .concat(',.mat-icon[ng-reflect-svg-icon="info"]')
  .concat(',.mat-icon[data-mat-icon-name="info"]')
  // .concat(',.mat-icon')
  .concat(',nz-pagination:not(.ant-pagination-disabled) > li[nz-pagination-item]:not(.ant-pagination-disabled)');

  public handelTabindex(): void {
    let dataElement: NodeListOf<HTMLElement> =
      document.querySelectorAll(this.selecttorValueStatic);

    if (dataElement.length > 0) {
      dataElement.forEach(e => {

        // if (e.getAttribute('svgicon') === 'icon-len' && !e.className.includes('ic-dis')) {
        //   e.setAttribute('tabindex', '0');

        //   return;
        // }

        if (e.className.includes('ic-dis')
        || e.getAttribute('disabled') === 'true'
        || e.getAttribute('aria-disabled') === 'true'
        || e.getAttribute('ng-reflect-disabled') === 'true'
        || e.className.includes('ant-pagination-disabled')
        || e.className.includes('mat-checkbox-input')
        || e.className.includes('disable-oke')
        || e.className.includes('disable')
        || e.className.includes('ant-tabs-tabpane')
        || e.className.includes('btn-icon-disable')
        || e.className.includes('ant-dropdown-trigger')
        || e.className.includes('btn-delete-disable')
        || e.className.includes('btn-icon-grid-disable')
        || this.handelIconLen(e)
        || this.handelMatChexBoxDisable(e)
        || this.handelDateTimePickerDisable(e)
        ) {
          e.setAttribute('tabindex', '-1');
        } else {
          e.setAttribute('tabindex', '0');
        }
      });
    }

    let dataSortHeader: HTMLCollectionOf<Element> = document.getElementsByClassName('mat-sort-header-container');

    let dataAntTab: HTMLCollectionOf<Element> = document.getElementsByClassName('ant-tabs-tab-btn');


    if (dataSortHeader.length > 0) {

      let index1 = 0;

      while (index1 < dataSortHeader.length) {
        dataSortHeader.item(index1)?.setAttribute('tabindex', '-1');
        index1++;
      }
    }

    if (dataAntTab.length > 0) {

      let index2 = 0;

      while (index2 < dataAntTab.length) {
        dataAntTab.item(index2)?.setAttribute('tabindex', '-1');
        index2++;
      }
    }
  }

  public handelIconLen(e:HTMLElement):boolean{

    if(e.getAttribute('svgicon') !== 'icon-len') return false;

    // e.parentElement?.tagName()
    let elementInput = e.parentElement?.getElementsByClassName('mat-input-element')[0] as HTMLElement;

    if(  e.parentElement?.getElementsByClassName('mat-input-element') && e.parentElement?.getElementsByClassName('mat-input-element').length > 0 &&  !isNull(elementInput)){
      if(!isNull(elementInput.getAttribute('disabled'))){
        return true;
      }
    }

    return false;
  }

  public handelMatChexBoxDisable(e:HTMLElement):boolean{

    if(!e.className.includes('mat-checkbox-layout')) return false;

    if(e.parentElement?.className.includes('mat-checkbox-disabled')){
      return true;
    }

    return false;
  }

  public handelDateTimePickerDisable(e:HTMLElement):boolean{

    if(e.getAttribute('aria-label') !== 'Open calendar') return false;

    if( (e.parentElement?.parentElement?.parentElement !== null) && e.parentElement?.parentElement?.parentElement?.className.includes('mat-form-field-flex')){

      let elementChild:HTMLCollectionOf<Element> = e.parentElement?.parentElement?.parentElement.querySelectorAll('input[disabled]') as unknown as HTMLCollectionOf<Element>;

      if(!isNull(elementChild) && elementChild.length > 0){
        return true;
      }
    }

    return false;
  }
}
