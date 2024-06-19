import { async } from '@angular/core/testing';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse } from '@angular/common/http';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonSettingArrayModel, CommonSettingModel } from '@auth/models';
import { RolesModel } from '@common/models';
import * as Encoding from 'encoding-japanese';
import { isNull, isNumber, isString, isUndefined } from 'lodash';
import * as moment from 'moment';
import { environment } from '@env/environment';


export class Utils {

  public static endTimeISO = 'T23:59:59.999Z';
  public static userLoginLocalStore = 'user_login';

  public static getStatusString(status: any, type: string): any {

    if (type === 'closeStatus') {
      return status === '0' ? 'common.title.not-yet' : status === '1' ? 'common.title.remaining' : 'common.title.already';
    }

    if (type === 'inputStatus') {
      return status === '0' ? 'common.title.not-closed' : 'common.title.closed';
    }

    if (type === 'textColor') {
      return status === '0' ? '未処理' : status === '1' ? '処理中' : '処理済み';
    }
  }
  public static getValueByKey(element: any, keyIn: string): any {
    if (!element) {
      return null;
    }

    // split by +
    const multiKeyArr: Array<any> = keyIn.split('+');
    const finalValue: Array<any> = [];

    multiKeyArr.forEach((eachKey) => {
      // split the key

      const keyArr: Array<any> = this.splitFirstOccur(eachKey, '.');
      // get first

      if (!keyArr) {
        finalValue.push(null);
      }

      if (keyArr.length === 2) {
        // have multiple
        const key = keyArr[0];
        const nextKey = keyArr[1];

        const value = this.processElementKey(element, key, nextKey);

        finalValue.push(value);
      } else if (keyArr.length === 1) {
        // only one left
        const key = keyArr[0];
        const value = this.processElementKey(element, key, null);

        finalValue.push(value);
      } else {
        finalValue.push(null);
      }
    });

    // post recursive processing
    if (finalValue.length <= 1) {
      const combineArr = finalValue[0];
      let filteredValue;

      if (Array.isArray(combineArr)) {
        filteredValue = combineArr.filter((el) => el !== null);
      } else {
        filteredValue = combineArr;
      }

      return !isNull(filteredValue) && typeof (filteredValue) !== 'undefined' ? filteredValue.toString() : null;
    } else if (finalValue.length === 2) { // supporting up to 2 for now
      // split and if only one then merge them
      const array1: any = finalValue[0];
      const array2: any = finalValue[1];

      if (!Array.isArray(array1) && !Array.isArray(array2)) {
        return array1 && array2 ? (array1 + ': ' + array2) : (array1 !== null ? array1 : null);
      } else {
        const combineArr = array1.map((e: any, i: any) => {
          if (array2[i]) { // need to fix this shit up
            return e + ': ' + array2[i];
          } else {
            return e;
          }
        });

        return combineArr.filter((el: any) => el !== null);
      }
    }

    return finalValue.filter((el) => el !== null);
  }

  public static processElementKey(element: any, key: any, nextKey: any): string | null {
    if (key.slice(-1) === ']') {
      // is array slice it apart
      const splitKey = key.split('[');

      const keyId = splitKey[0];
      const arrNumber = splitKey[1].slice(0, -1);

      if (arrNumber === 'all') {
        // loop and print all
        const value: any = [];

        if (!element[keyId]) {
          return null;
        }

        element[keyId].forEach((el: any) => {
          value.push(nextKey ? this.getValueByKey(el, nextKey) : el);
        });

        return value;
      } else {
        return nextKey ? this.getValueByKey(element[keyId] ? element[keyId][arrNumber] : null, nextKey) :
          element[keyId] ? element[keyId][arrNumber] : null;
      }
    } else {
      return nextKey ? this.getValueByKey(element[key], nextKey) : element[key];
    }
  }

  public static splitFirstOccur(str: any, spliyBy: any): any[] {
    const keyArr = [];
    const first = str.substr(0, str.indexOf(spliyBy));

    if (first) {
      keyArr.push(first);
    }

    const second = str.substr(str.indexOf(spliyBy) + 1);

    if (second) {
      keyArr.push(second);
    }

    return keyArr;
  }

  public static isDate(input: any): boolean {
    if (Object.prototype.toString.call(input) === '[object Date]') {
      return true;
    }

    return false;
  }

  // check validate date
  public static validDate(date: any): boolean {
    if (moment(date, 'YYYY/MM/DD', true).isValid()) {
      date = date.split('/');
      const dd = +date[0];
      const mm = +date[1];
      const yy = +date[2];
      const listofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if (mm === 1 || mm > 2) {
        if (dd > listofDays[mm - 1]) {
          new Error('Invalid date format!');

          return false;
        }
      }

      if (mm === 2) {
        let leapYear = false;

        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
          leapYear = true;
        }

        if ((leapYear === false) && (dd >= 29)) {
          new Error('Invalid date format!');

          return false;
        }

        if ((leapYear === true) && (dd > 29)) {
          new Error('Invalid date format!');

          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  }

  public static formatZeroFill(value: number, type: number): string {
    return value.toString().padStart(type, '0');
  }

  public static validateFaxPhonePostCode(control: AbstractControl): null | object {
    let val = control.value ? control.value.toString().replace(/-/g, '') : '';

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidFaxPhonePostCode': true };

    return null;
  }

  public static checkCodeReal(control: AbstractControl): null | object {
    let val = control.value ? control.value.toString().replace(/-/g, '') : '';

    if (val === null || val === '') return null;

    if (val.toString().match(/[^a-zA-Z0-9]/)) return { 'errorFormat': true };

    return null;
  }
  //include *
  public static checkCodeReal2(control: AbstractControl): null | object {
    let val = control.value ? control.value.toString().replace(/-/g, '') : '';

    if (val === null || val === '') return null;

    if (val.toString().match(/[^a-zA-Z0-9*]/)) return { 'errorFormat': true };

    return null;
  }

  public static checkMail(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^([a-z0-9A-Z](\.?[a-z0-9A-Z]){1,})\@\w+([\.-]?\w+)(\.\w{2,3})+$/)) return { 'invalidMail': true };

    return null;
  }


  public static checkCode(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return null;

    val = val.toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

    if (val.toString().match(/[^a-zA-Z0-9]/)) return { 'errorFormat': true };

    return null;
  }


  public static convertDateFormat(inputDate: Date, format: 'YYYYMMDD' | 'YYYYMMDDHHMM' | 'YYYYMMDDHHMMSS' | 'YYYYMMDDHHMMSSMS', separator: string = '/'): string {
    let year = inputDate.getFullYear();
    let month = inputDate.getMonth() < 9 ? '0' + (inputDate.getMonth() + 1) : (inputDate.getMonth() + 1); // getMonth() is zero-based
    let date = inputDate.getDate() < 10 ? '0' + inputDate.getDate() : inputDate.getDate();
    let hours = inputDate.getHours() < 10 ? '0' + inputDate.getHours() : inputDate.getHours();
    let minutes = inputDate.getMinutes() < 10 ? '0' + inputDate.getMinutes() : inputDate.getMinutes();
    let seconds = inputDate.getSeconds() < 10 ? '0' + inputDate.getSeconds() : inputDate.getSeconds();
    const miliSeconds = inputDate.getMilliseconds();

    switch (format) {
      case 'YYYYMMDD':
        return [year, month, date].join(separator);

      case 'YYYYMMDDHHMM':
        return [year, month, date].join(separator) + ' ' + [hours, minutes].join(':');

      case 'YYYYMMDDHHMMSS':
        return [year, month, date].join(separator) + ' ' + [hours, minutes, seconds].join(':');

      case 'YYYYMMDDHHMMSSMS':
        return [year, month, date].join(separator) + ' ' + [hours, minutes, seconds].join(':') + '.' + miliSeconds;

      default:
        return inputDate.toString();
    }
  }

  public static formatDateTimeToTime(date: string): string {
    let d = new Date(Date.parse(date));

    return d.getTime().toString();
  }

  public static checkPermission(): boolean {
    return JSON.parse(localStorage.getItem('user_login') || '{}').roles[0].role !== RolesModel.ADMIN ? true : false;
  }

  public static JsonToString(object: object): string {
    return object && JSON.stringify(object);
  }

  public static checkNumberic(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

    return null;
  }
  public static checkFromValue(formControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let val = control.value;

      if (!control.parent?.get(formControlName)?.errors?.['required']) {
        control.parent?.get(formControlName)?.setErrors(null);
      }

      if (val === null || val === '') return null;


      if (control.parent?.get(formControlName)?.getRawValue() === null || control.parent?.get(formControlName)?.getRawValue() === '') return null;

      if (val > control.parent?.get(formControlName)?.getRawValue()) {
        control.parent?.get(formControlName)?.setErrors({ 'dateInvalidTo': true });

        return { 'dateInvalidFrom': true };
      }
      return null;
    };
  }
  public static checkToValue(formControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let val = control.value;

      if (!control.parent?.get(formControlName)?.errors?.['required']) {
        control.parent?.get(formControlName)?.setErrors(null);
      }

      if (val === null || val === '') return null;


      if (control.parent?.get(formControlName)?.getRawValue() === null || control.parent?.get(formControlName)?.getRawValue() === '') return null;

      if (control.parent?.get(formControlName)?.getRawValue() > val) {
        control.parent?.get(formControlName)?.setErrors({ 'dateInvalidFrom': true });
        console.log("dateInvalidTo :",Number.isInteger(val));
        console.log("control.parent?.get(formControlName)?.getRawValue(): ",control.parent?.get(formControlName)?.getRawValue());

        return { 'dateInvalidTo': true };
      }
      console.log("dateInvalidTo",false);

      return null;
    };
  }

  public static checkFromValueNumber(formControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let val = control.value;

      if (!control.parent?.get(formControlName)?.errors?.['required']) {
        control.parent?.get(formControlName)?.setErrors(null);
      }

      if ((val) === null || val === '') return null;


      if (control.parent?.get(formControlName)?.getRawValue() === null || control.parent?.get(formControlName)?.getRawValue() === '') return null;

      if (Number(val) > Number(control.parent?.get(formControlName)?.getRawValue())) {
        control.parent?.get(formControlName)?.setErrors({ 'dateInvalidTo': true });
        return { 'dateInvalidFrom': true };
      }
      return null;
    };
  }
  public static checkToValueNumber(formControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let val = control.value;
      if (!control.parent?.get(formControlName)?.errors?.['required']) {
        control.parent?.get(formControlName)?.setErrors(null);
      }

      if (val === null || val === '') return null;
      if (control.parent?.get(formControlName)?.getRawValue() === null || control.parent?.get(formControlName)?.getRawValue() === '') return null;

      if (Number(control.parent?.get(formControlName)?.getRawValue()) > Number(val)) {
        control.parent?.get(formControlName)?.setErrors({ 'dateInvalidFrom': true });

        return { 'dateInvalidTo': true };
      }

      return null;
    };
  }

  public static checkFromDate(formControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let val = control.value;
      if (!control.parent?.get(formControlName)?.errors?.['matDatepickerParse'] &&
        !control.parent?.get(formControlName)?.errors?.['required'] &&
        !control.parent?.get(formControlName)?.errors?.['errorEnterPastDate'] &&
        !control.parent?.get(formControlName)?.errors?.['matDatepickerMin']) {
        control.parent?.get(formControlName)?.setErrors(null);
      }

      if (val === null || val === '') return null;


      if (control.parent?.get(formControlName)?.getRawValue() === null || control.parent?.get(formControlName)?.getRawValue() === '') return null;

      if ((new Date(val)) > (new Date(control.parent?.get(formControlName)?.getRawValue())) &&
        !control.parent?.get(formControlName)?.errors?.['errorEnterPastDate'] &&
        !control.parent?.get(formControlName)?.errors?.['matDatepickerMin']) {
        control.parent?.get(formControlName)?.setErrors({ 'dateInvalidTo': true });
        return { 'dateInvalidFrom': true };
      }
      return null;
    };
  }
  public static checkToDate(formControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let val = control.value;
      if (!control.parent?.get(formControlName)?.errors?.['matDatepickerParse'] &&
        !control.parent?.get(formControlName)?.errors?.['required'] &&
        !control.parent?.get(formControlName)?.errors?.['errorEnterPastDate'] &&
        !control.parent?.get(formControlName)?.errors?.['matDatepickerMin']) {
        control.parent?.get(formControlName)?.setErrors(null);
      }

      if (val === null || val === '') return null;


      if (control.parent?.get(formControlName)?.getRawValue() === null || control.parent?.get(formControlName)?.getRawValue() === '') return null;

      if ((new Date(control.parent?.get(formControlName)?.getRawValue())) > (new Date(val)) && !control.parent?.get(formControlName)?.errors?.['errorEnterPastDate']
        && !control.parent?.get(formControlName)?.errors?.['matDatepickerMin']) {
        control.parent?.get(formControlName)?.setErrors({ 'dateInvalidFrom': true });
        return { 'dateInvalidTo': true };
      }
      return null;
    };
  }

  public static coverStringToInt(value: string): number {
    return typeof (value) === 'number' ? parseInt(value) : 0;
  }

  public static getMessError(error: ValidationErrors | null | undefined, fieldName?: string ,fieldName2?: string): string {

    if (!error) return '';


    let key = Object.keys(error).toString().split(',');
    let keyError = key[key.length - 1];
    let mess = '';

    switch (keyError) {

      case 'invalidFaxPhonePostCode':
        mess = 'common.message.error-data-format';
        break;

      case 'postcode':
        mess = 'common.message.error-zipcode';
        break;

      case 'errorFormat':
        mess = 'common.message.error-data-format';
        break;

      case 'notMatch':
        mess = 'common.message.password-not-match';
        break;

      case 'minlength':
        mess = 'common.message.error-data-format';
        break;

      case 'invalidNumber':
        mess = 'common.message.error-data-format';
        break;

      case 'invalidMail':
        mess = 'common.message.error-data-format';
        break;

      case 'email':
        mess = 'common.message.error-data-format';
        break;

      case 'validPassword':
        mess = 'common.message.error-data-format';
        break;

      case 'required':
        mess = 'common.message.error-required';
        break;

      case 'matDatepickerParse':
        mess = 'common.message.error-data-format';
        break;

      case 'matDatepickerMin':
        mess = 'common.message.error-data-format';
        break;

      case 'requireLogin':
        mess = 'common.message.login-infor-required';
        break;

      case 'maxlength':
        mess = 'common.message.error-maxlenght';
        break;

      case 'existing':
        mess = 'common.message.data-existed';
        break;

      case 'emailNotExisted':
        mess = 'common.message.email-not-existed';
        break;

      case 'emailExisted':
        mess = 'common.message.email-existed';
        break;

      case 'dateInvalidFrom':
        mess = `${fieldName} From は ${fieldName2}To以下の値を指定してください。`;
        break;

      case 'dateInvalidTo':
        mess = `${fieldName2} To は ${fieldName}From以上の値を指定してください。`;
        break;

      case 'notFound':
        mess = 'common.message.not-existed';
        break;

      case 'passwordWrong':
        mess = 'common.message.password-wrong';
        break;

      case 'passwordDuplicate':
        mess = 'common.message.password-duplicate';
        break;

      case 'matDatepickerMax':
        mess = 'common.message.error-data-format';
        break;

      case 'duplicateSlipNo':
        mess = 'common.message.slip-no-existed';
        break;

      case 'productPackingRequired':
        mess = 'common.message.product-packing-required';
        break;

      case 'salePriceRequired':
        mess = 'common.message.sale-price-required';
        break;

      case 'purchasePriceRequired':
        mess = 'common.message.purchase-price-required';
        break;

      case 'notFoundInventoryProduct':
        mess = 'common.message.register-error';
        break;

      case 'errorLackOfInventory':
        mess = 'common.message.error-lack-of-inventory';
        break;

      case 'notValidData':
        mess = 'common.message.not-valid-data';
        break;

      case 'errorQuantityMinus':
        mess = 'common.message.error-quantity-minus';
        break;

      case 'duplicateInventoryInfo':
        mess = 'common.message.duplicate_inventory_info';
        break;

      case 'overMaximumPrintQuantity':
        mess = `最大枚数は${fieldName}枚までご指定ください。`;
        break;

      case 'ownerErrror':
        mess = `所有者が${fieldName}以外、登録できません。`;
        break;

      case 'ownerOverlapErrror':
        mess = 'common.message.owner_overlap_errror';
        break;

      case 'errorProductQuantityMin':
        mess = 'common.message.error-product-quantity-min';
        break;

      case 'errorEnterPastDate':
        mess = `${fieldName}は現在日付以上の値を指定してください。`;
        break;

      case 'overlapDeliveryDate':
        mess = 'common.message.delivery-date-must-overlap';
        break;

      case 'ownerChangeNotExisted':
        mess = 'common.message.owner-change-not-existed';
        break;

      case 'wrongDateInputError':
        mess = 'common.message.wrong-date-input-error';
        break;

      case 'duplicateStocktaking':
        mess = 'common.message.duplicate-stocktaking';
        break;

      case 'duplicateStocktakingInfo':
        mess = 'common.message.duplicate_inventory_info';
        break;

      case 'stocktakingQuantityErrorByAllocated':
        mess = 'common.message.stocktaking-quantity-error-by-allocated';
        break;

      case 'notBeStocktakingObject':
        mess = 'common.message.not-be-stocktaking-object';
        break;

      case 'errorImportNotMapping':
        mess = 'common.message.error-import-not-mapping';
        break;

      case 'notRegisterMaster':
        mess = 'common.message.not-register-master';
        break;

      case 'unitNotExist':
        mess = 'common.message.unit-not-exist';
        break;

      case 'notHaveProductChild':
        mess = 'common.message.not_have_product_child';
        break;

      case 'structureTotalError':
        mess = 'common.message.structure-total-error';
        break;

      case 'notBeSetObject':
        mess = 'common.message.not-be-set-object';
        break;

      case 'overAllocatedQuantity':
        mess = 'common.message.over_allocated_quantity';
        break;

      default:
        mess = keyError;
        break;
    }

    return mess;
  }

  public static validHalfWidth(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return null;

    if (val.toString().match(/[^a-zA-Z0-9]/)) return { 'errorFormat': true };

    return null;
  }

  public static checkSpace(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().trim()) return { 'errorFormat': true };

    return null;
  }

  public static validHalfSize(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return null;

    if (val.toString().match(/[^\w!@#$%^&*(),.?":{}[\]\`\~\_\+\=\-\/\\;'|<>]/)) return { 'errorFormat': true };

    return null;
  }

  public static checkNumber(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+([0-9]+)?$/)) return { 'invalidNumber': true };

    return null;
  }

  public static getCommonSettingByCode(code: keyof CommonSettingArrayModel): CommonSettingModel[] {
    let commonSettingByCode: CommonSettingModel[] = JSON.parse(localStorage.getItem('common_setting') + '')[code];

    return commonSettingByCode;

  }
  public static formatNumberAsCurrency(number: number): string | null {

    return !isNull(number) ? number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : null;

  }

  public static exportPdf(res: HttpResponse<Blob>, datalocalURL: string): void {
    let blob: Blob = res.body as Blob;

    const a = document.createElement('a');

    datalocalURL = URL.createObjectURL(blob);

    let tab = window.open();

    if (tab) {
      tab.location.href = datalocalURL;
    }
  }

  public static async exportPdfDailyProcess(res: HttpResponse<Blob>, datalocalURL: string): Promise<void> {
    let blob: Blob = res.body as Blob;

    const a = document.createElement('a');

    datalocalURL = await URL.createObjectURL(blob);

    let tab = window.open();

    if (tab) {
      tab.location.href = datalocalURL;
    }
  }

  // previewPDf
  public static previewPDf(url: String): void {
    const a = document.createElement('a');

    a.href = environment.PREVIEW_PDF + url;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
  }

  public static downloadPdfByUrl(nameDownload: string): void {
    const a = document.createElement('a');

    a.href =  environment.PREVIEW_PDF + nameDownload;
    a.download = nameDownload;
    document.body.append(a);
    a.click();
    a.remove();
  }

  public static downloadPdf(res: HttpResponse<Blob>, dataLocalURL: string, nameDownload: string = dataLocalURL): void {
    const a = document.createElement('a');
    let blob: Blob = res.body as Blob;

    dataLocalURL = URL.createObjectURL(blob);
    a.href = dataLocalURL;
    a.download = nameDownload;
    document.body.append(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(dataLocalURL);
  }

  public static removeThousandSparator(value: number | string | undefined): number {
    if (value && isString(value) && value.indexOf(',') > 0) {
      return Number(value.replaceAll(',', ''));
    }
    else return Number(value);
  }

  public static addThousandSparator(value?: number | string | null): string | number | undefined | null {
    if (value && isNumber(value) && String(value).length > 3) {
      return Utils.formatNumberAsCurrency(value) ?? 0;
    }

    return value;
  }

  public static downloadTxt(res: any): void {

    const contentDisposition = res.headers.get('content-disposition');
    const newBlob = new Blob([res.body], {
      type: 'text/plain'
    });
    const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();

    this.downLoadFile(newBlob, filename);

    // newBlob.text().then(text => {
    //   let blobText = text.toString().replace(/"/g, '').replace('\r\n', '');
    //    const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
    //    let filenameTmp = filename.replace(/\"/gi, '');
    //     const textBlob = new Blob([blobText]);

    //    filenameTmp = decodeURIComponent(filenameTmp);


    //    let convertCsvDate = Utils.convertToShiftJIS(blobText);
    //    let blob = new Blob([convertCsvDate], {type:'text/csv;charset=Shift_JIS'});
    //    let url = (window.URL || window.webkitURL).createObjectURL(blob);
    //    let link = document.createElement('a');

    //    link.setAttribute('href', url);
    //    link.setAttribute('charset', 'Shift_JIS');
    //    link.setAttribute('download', filename);
    //    link.style.visibility = 'hidden';
    //    document.body.appendChild(link);
    //    link.click();
    //    setTimeout(() => {(window.URL || window.webkitURL).revokeObjectURL(link.href); }, 100);
    //    document.body.removeChild(link);
    //   //  this.downLoadFile(textBlob, filenameTmp);
    //  });

  }

  public static convertToShiftJIS(target: any): any {
    const uniArray = Encoding.stringToCode(target);
    const sjisArray = Encoding.convert(uniArray, {
      to: 'SJIS',
      from: 'UTF8'
    });
    // const sjisString = Encoding.codeToString(sjisArray);
    const unit8Array = new Uint8Array(sjisArray);

    return unit8Array;
  }

  // DownLoadCSV
  public static downLoadFile(blob: Blob, filename: string): string {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.href = url;
    a.download = filename;
    a.click();
    a.remove();

    return url;
  }

  public static removeFormControlError(control: FormGroup, errorName: string): void {

    if (control?.errors && control?.errors[errorName]) {
      delete control.errors[errorName];

      if (Object.keys(control.errors).length === 0) {
        control.setErrors(null);
      }
    }
  }

  public static checkQuantity(control: AbstractControl): null | object {
    let val = control.parent?.get('quantity')?.getRawValue();
    let quantity;

    if (val && isString(val) && val.indexOf(',') > 0) {
      quantity = Number(val.replaceAll(',', ''));
    }
    else quantity = Number(val);

    if ((control.value !== null || control.value !== '') && quantity < 1) return { required: true };

    if ((control.value === null || control.value === '') && quantity < 1) return { required: true };

    return null;
  }

  public static checkQuantityInput(quantityName?: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let val = control.parent?.get(isUndefined(quantityName) ? 'quantity' : quantityName)?.getRawValue();
      let quantity;

      if (val && isString(val) && val.indexOf(',') > 0) {
        quantity = Number(val.replaceAll(',', ''));
      }
      else quantity = Number(val);

      if ((control.value !== null || control.value !== '') && quantity < 1) return { required: true };

      if ((control.value === null || control.value === '') && quantity < 1) return { required: true };

      return null;
    };
  }

  public static checkQuantityOrder(quantityName?: string, csQuantityName?: string, blQuantityName?: string, psQuantityName?: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let val = control.parent?.get(isUndefined(quantityName) ? 'quantity' : quantityName)?.getRawValue();
      let quantity;

      if (val && isString(val) && val.indexOf(',') > -1) {
        quantity = Number(val.replaceAll(',', ''));
      }
      else quantity = Number(val);


      if ((control.value !== null || control.value !== '') && quantity < 0) return { required: true };

      if ((control.value === null || control.value === '') && quantity < 0) return { required: true };

      if ((isNull(control.parent?.get(csQuantityName ? csQuantityName : 'csQuantity')?.getRawValue()) || control.parent?.get(csQuantityName ? csQuantityName : 'csQuantity')?.getRawValue() === '')
        && (isNull(control.parent?.get(blQuantityName ? blQuantityName : 'blQuantity')?.getRawValue()) || control.parent?.get(blQuantityName ? blQuantityName : 'blQuantity')?.getRawValue() === '')
        && (isNull(control.parent?.get(psQuantityName ? psQuantityName : 'psQuantity')?.getRawValue()) || control.parent?.get(psQuantityName ? psQuantityName : 'psQuantity')?.getRawValue() === '')) {
        return { required: true };
      }

      return null;
    };
  }

  public static checkQuantityOrderOwnerChange(quantityName?: string, csQuantityName?: string, blQuantityName?: string, psQuantityName?: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let val = control.parent?.get(isUndefined(quantityName) ? 'quantity' : quantityName)?.getRawValue();
      let quantity;

      if (val && isString(val) && val.indexOf(',') > 0) {
        quantity = Number(val.replaceAll(',', ''));
      }
      else quantity = Number(val);

      if ((control.value !== null || control.value !== '') && quantity < 1) return { required: true };

      if ((control.value === null || control.value === '') && quantity < 1) return { required: true };

      if ((isNull(control.parent?.get(csQuantityName ? csQuantityName : 'csQuantity')?.getRawValue()) || control.parent?.get(csQuantityName ? csQuantityName : 'csQuantity')?.getRawValue() === '')
        && (isNull(control.parent?.get(blQuantityName ? blQuantityName : 'blQuantity')?.getRawValue()) || control.parent?.get(blQuantityName ? blQuantityName : 'blQuantity')?.getRawValue() === '')
        && (isNull(control.parent?.get(psQuantityName ? psQuantityName : 'psQuantity')?.getRawValue()) || control.parent?.get(psQuantityName ? psQuantityName : 'psQuantity')?.getRawValue() === '')) {
        return { required: true };
      }

      return null;
    };
  }

  public static convertQuantityDefaultInput(control: FormGroup, quantityName: string, isPackCsInputName: string, isPackBlInputName: string, isPieceInputName: string,
    csQuantityName: string, blQuantityName: string, psQuantityName: string, IsEventEmit?: boolean): void {

    let val = control.get(quantityName)?.getRawValue();
    let quantity;

    if (val && isString(val) && val.indexOf(',') > 0) {
      quantity = Number(val.replaceAll(',', ''));
    }
    else quantity = Number(val);

    if (quantity < 1) return;

    let isPackCsInput = control.get(isPackCsInputName)?.getRawValue();
    let isPackBlInput = control.get(isPackBlInputName)?.getRawValue();
    let isPieceInput = control.get(isPieceInputName)?.getRawValue();
    let packCsAmount = control.get('packCsAmount')?.getRawValue();
    let packBlAmount = control.get('packBlAmount')?.getRawValue();

    if (isPackCsInput === '1') {
      let csAmount = ((packCsAmount ?? 0)
        * packBlAmount);

      if (csAmount > 0) {
        let quantityNew = quantity;

        control.get(csQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / csAmount) === 0 ? null
          : Math.floor(quantityNew / csAmount)), { emitEvent: IsEventEmit ? true : false });
        quantity = quantityNew - ((Math.floor(quantityNew / csAmount)) * csAmount);
      }
    } else {
      control.get(csQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
    }

    if (isPackBlInput === '1' && quantity > 0) {
      let quantityNew = quantity;

      control.get(blQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / packBlAmount) === 0 ? null :
        Math.floor(quantityNew / packBlAmount)), { emitEvent: IsEventEmit ? true : false });
      quantity = quantityNew - ((Math.floor(quantityNew / packBlAmount)) * packBlAmount);
    } else {
      control.get(blQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
    }

    if (isPieceInput === '1' && quantity > 0) {
      control.get(psQuantityName)?.setValue(quantity === 0 ? null : this.addThousandSparator(quantity), { emitEvent: IsEventEmit ? true : false });
    } else {
      control.get(psQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
    }
  }

  public static convertQuantityDefaultOrder(control: FormGroup, quantityName: string, isPackCsInputName: string, isPackBlInputName: string, isPieceInputName: string,
    csQuantityName: string, blQuantityName: string, psQuantityName: string, IsEventEmit?: boolean): void {

    let val = control.get(quantityName)?.getRawValue();
    let quantity;

    if (val && isString(val) && val.indexOf(',') > 0) {
      quantity = Number(val.replaceAll(',', ''));
    }
    else quantity = Number(val);

    if (quantity < 1) return;

    let isPackCsInput = control.get(isPackCsInputName)?.getRawValue();
    let isPackBlInput = control.get(isPackBlInputName)?.getRawValue();
    let isPieceInput = control.get(isPieceInputName)?.getRawValue();
    let packCsAmount = control.get('packCsAmount')?.getRawValue();
    let packBlAmount = control.get('packBlAmount')?.getRawValue();

    if (isPackCsInput === '1') {
      let csAmount = ((packCsAmount ?? 0)
        * packBlAmount);

      if (csAmount > 0) {
        let quantityNew = quantity;

        control.get(csQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / csAmount) === 0 ?
          (isNull(control.get(csQuantityName)?.getRawValue()) || control.get(psQuantityName)?.getRawValue() === ''  ? null : control.get(csQuantityName)?.getRawValue())
          : Math.floor(quantityNew / csAmount)), { emitEvent: IsEventEmit ? true : false });
        quantity = quantityNew - ((Math.floor(quantityNew / csAmount)) * csAmount);
      }
    } else {
      control.get(csQuantityName)?.setValue((isNull(control.get(csQuantityName)?.getRawValue()) ? null : control.get(csQuantityName)?.getRawValue()), { emitEvent: IsEventEmit ? true : false });
    }

    if (isPackBlInput === '1' && quantity > 0) {
      let quantityNew = quantity;

      control.get(blQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / packBlAmount) === 0 ?
        (isNull(control.get(blQuantityName)?.getRawValue()) || control.get(blQuantityName)?.getRawValue() === '' ? null : (Number(control.get(blQuantityName)?.getRawValue()) > 0 ? null : 0)) :
        Math.floor(quantityNew / packBlAmount)), { emitEvent: IsEventEmit ? true : false });
      quantity = quantityNew - ((Math.floor(quantityNew / packBlAmount)) * packBlAmount);
    } else {
      if (!isNull(control.get(blQuantityName)?.getRawValue()) && Number(control.get(blQuantityName)?.getRawValue()) > 0) {
        control.get(blQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      } else {
        control.get(blQuantityName)?.setValue((isNull(control.get(blQuantityName)?.getRawValue()) ? null :
          (control.get(blQuantityName)?.getRawValue() === '0' ? 0 : null)), { emitEvent: IsEventEmit ? true : false });
      }
    }

    if (isPieceInput === '1' && quantity > 0) {
      control.get(psQuantityName)?.setValue(quantity === 0 ?
        (isNull(control.get(psQuantityName)?.getRawValue()) || control.get(psQuantityName)?.getRawValue() === '' ? null : (Number(control.get(psQuantityName)?.getRawValue()) > 0 ? null : 0)) :
        this.addThousandSparator(quantity), { emitEvent: IsEventEmit ? true : false });
    } else {
      if (!isNull(control.get(psQuantityName)?.getRawValue()) && Number(control.get(psQuantityName)?.getRawValue()) > 0) {
        control.get(psQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      } else {
        control.get(psQuantityName)?.setValue((isNull(control.get(psQuantityName)?.getRawValue()) ? null :
          (control.get(psQuantityName)?.getRawValue() === '0' ? 0 : null)), { emitEvent: IsEventEmit ? true : false });
      }
    }
  }

  public static convertQuantityDefaultInventory(control: FormGroup, quantityName: string, isPackCsInputName: string, isPackBlInputName: string, isPieceInputName: string,
    isPackCsOutputtName: string, isPackBlOutputtName: string, isPieceOutputtName: string, csQuantityName: string, blQuantityName: string, psQuantityName: string, IsEventEmit?: boolean): void {

    let val = control.get(quantityName)?.getRawValue();
    let quantity;

    if (val && isString(val) && val.indexOf(',') > 0) {
      quantity = Number(val.replaceAll(',', ''));
    }
    else quantity = Number(val);

    if (quantity < 1) return;

    let isPackCsInput = control.get(isPackCsInputName)?.getRawValue();
    let isPackBlInput = control.get(isPackBlInputName)?.getRawValue();
    let isPieceInput = control.get(isPieceInputName)?.getRawValue();
    let isPackCsOutput = control.get(isPackCsOutputtName)?.getRawValue();
    let isPackBlOutput = control.get(isPackBlOutputtName)?.getRawValue();
    let isPieceOutput = control.get(isPieceOutputtName)?.getRawValue();
    let packCsAmount = control.get('packCsAmount')?.getRawValue();
    let packBlAmount = control.get('packBlAmount')?.getRawValue();

    if (isPackCsInput === '1' || isPackCsOutput === '1') {
      let csAmount = ((packCsAmount ?? 0)
        * packBlAmount);

      if (csAmount > 0) {
        let quantityNew = quantity;

        control.get(csQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / csAmount) === 0 ? null :
          Math.floor(quantityNew / csAmount)), { emitEvent: IsEventEmit ? true : false });
        quantity = quantityNew - ((Math.floor(quantityNew / csAmount)) * csAmount);
      }
    } else {
      control.get(csQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
    }

    if (isPackBlInput === '1' || isPackBlOutput === '1' && quantity > 0) {
      let quantityNew = quantity;

      control.get(blQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / packBlAmount) === 0 ? null :
        Math.floor(quantityNew / packBlAmount)), { emitEvent: IsEventEmit ? true : false });
      quantity = quantityNew - ((Math.floor(quantityNew / packBlAmount)) * packBlAmount);
    } else {
      control.get(blQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
    }

    if (isPieceInput === '1' || isPieceOutput === '1' && quantity > 0) {
      control.get(psQuantityName)?.setValue(this.addThousandSparator(quantity === 0 ? null : quantity), { emitEvent: IsEventEmit ? true : false });
    } else {
      control.get(psQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
    }
  }

  public static convertQuantityDefaultDeliveryChangeAllocation(control: FormGroup, quantityName: string, isPackCsOutputName: string, isPackBlOutputName: string, isPieceOutputName: string,
    csQuantityName: string, blQuantityName: string, psQuantityName: string, billingPackTypeName: string, IsEventEmit?: boolean): void {

    let val = control.get(quantityName)?.getRawValue();
    let quantity;

    if (val && isString(val) && val.indexOf(',') > 0) {
      quantity = Number(val.replaceAll(',', ''));
    }
    else quantity = Number(val);

    if (quantity < 1) {
      control.get(csQuantityName)?.setValue(
        (isNull(control.get(csQuantityName)?.getRawValue()) || control.get(csQuantityName)?.getRawValue() === '' ? null : control.get(csQuantityName)?.getRawValue())
        , { emitEvent: IsEventEmit ? true : false });
      control.get(blQuantityName)?.setValue(
        (isNull(control.get(blQuantityName)?.getRawValue()) || control.get(blQuantityName)?.getRawValue() === '' ? null : control.get(blQuantityName)?.getRawValue())
        , { emitEvent: IsEventEmit ? true : false });
      control.get(psQuantityName)?.setValue(
        (isNull(control.get(psQuantityName)?.getRawValue()) || control.get(psQuantityName)?.getRawValue() === '' ? null : control.get(psQuantityName)?.getRawValue())
        , { emitEvent: IsEventEmit ? true : false });

      return;
    }

    let isPackCsOutput = control.get(isPackCsOutputName)?.getRawValue();
    let isPackBlOutput = control.get(isPackBlOutputName)?.getRawValue();
    let isPieceOutput = control.get(isPieceOutputName)?.getRawValue();
    let billingPackType = control.get(billingPackTypeName)?.getRawValue();
    let packCsAmount = control.get('packCsAmount')?.getRawValue();
    let packBlAmount = control.get('packBlAmount')?.getRawValue();

    if (billingPackType === '3') {
      if (isPackCsOutput === '1') {
        let csAmount = ((packCsAmount ?? 0)
          * packBlAmount);

        if (csAmount > 0) {
          let quantityNew = quantity;

          control.get(csQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / csAmount) === 0 ?
            null : Math.floor(quantityNew / csAmount)), { emitEvent: IsEventEmit ? true : false });
          quantity = quantityNew - ((Math.floor(quantityNew / csAmount)) * csAmount);
        }
      } else {
        control.get(blQuantityName)?.setValue(
          (isNull(control.get(blQuantityName)?.getRawValue()) || control.get(blQuantityName)?.getRawValue() === '' ? null :
           (control.get(blQuantityName)?.getRawValue() === '0' ? '0' : null))
          , { emitEvent: IsEventEmit ? true : false });
      }

      if (isPackBlOutput === '1' && quantity > 0) {
        let quantityNew = quantity;

        control.get(blQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / packBlAmount) === 0 ?
          null : Math.floor(quantityNew / packBlAmount)), { emitEvent: IsEventEmit ? true : false });
        quantity = quantityNew - ((Math.floor(quantityNew / packBlAmount)) * packBlAmount);
      } else {
        // control.get(psQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
        control.get(blQuantityName)?.setValue(
          (isNull(control.get(blQuantityName)?.getRawValue()) || control.get(blQuantityName)?.getRawValue() === '' ? null :
           (control.get(blQuantityName)?.getRawValue() === '0' ? '0' : null))
          , { emitEvent: IsEventEmit ? true : false });
        // control.get(blQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
        control.get(psQuantityName)?.setValue(
          (isNull(control.get(psQuantityName)?.getRawValue()) || control.get(psQuantityName)?.getRawValue() === '' ? null :
           (control.get(psQuantityName)?.getRawValue() === '0' ? '0' : null)
           )
          , { emitEvent: IsEventEmit ? true : false });
      }

      if (isPieceOutput === '1' && quantity > 0) {
        control.get(psQuantityName)?.setValue(this.addThousandSparator(quantity === 0 ? null : quantity), { emitEvent: IsEventEmit ? true : false });
      } else {
        // control.get(psQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
        control.get(psQuantityName)?.setValue(
          (isNull(control.get(psQuantityName)?.getRawValue()) || control.get(psQuantityName)?.getRawValue() === '' ? null :
           (control.get(psQuantityName)?.getRawValue() === '0' ? '0' : null)
           )
          , { emitEvent: IsEventEmit ? true : false });
      }
    }

    if (billingPackType === '2') {
      if (isPackCsOutput === '1') {
        let csAmount = ((packCsAmount ?? 0)
          * packBlAmount);

        if (csAmount > 0) {
          let quantityNew = quantity;

          control.get(csQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / csAmount) === 0 ?
            null : Math.floor(quantityNew / csAmount)), { emitEvent: IsEventEmit ? true : false });
          quantity = quantityNew - ((Math.floor(quantityNew / csAmount)) * csAmount);
        }
      } else {
        // control.get(psQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
        control.get(blQuantityName)?.setValue(
          (isNull(control.get(blQuantityName)?.getRawValue()) || control.get(blQuantityName)?.getRawValue() === '' ? null :
           (control.get(blQuantityName)?.getRawValue() === '0' ? '0' : null))
          , { emitEvent: IsEventEmit ? true : false });
        // control.get(blQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
        control.get(psQuantityName)?.setValue(
          (isNull(control.get(psQuantityName)?.getRawValue()) || control.get(psQuantityName)?.getRawValue() === '' ? null :
           (control.get(psQuantityName)?.getRawValue() === '0' ? '0' : null)
           )
          , { emitEvent: IsEventEmit ? true : false });
      }

      if (isPackBlOutput === '1' && quantity > 0) {
        let quantityNew = quantity;

        control.get(blQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / packBlAmount) === 0 ?
          null : Math.floor(quantityNew / packBlAmount)), { emitEvent: IsEventEmit ? true : false });
        quantity = quantityNew - ((Math.floor(quantityNew / packBlAmount)) * packBlAmount);
      } else {
        control.get(psQuantityName)?.setValue(
          (isNull(control.get(psQuantityName)?.getRawValue()) || control.get(psQuantityName)?.getRawValue() === '' ? null :
           (control.get(psQuantityName)?.getRawValue() === '0' ? '0' : null)
           )
          , { emitEvent: IsEventEmit ? true : false });
      }
    }

    if (billingPackType === '1') {
      if (isPackCsOutput === '1') {
        let csAmount = ((packCsAmount ?? 0)
          * packBlAmount);

        if (csAmount > 0) {
          let quantityNew = quantity;

          control.get(csQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / csAmount) === 0 ? null :
            Math.floor(quantityNew / csAmount)), { emitEvent: IsEventEmit ? true : false });
          quantity = quantityNew - ((Math.floor(quantityNew / csAmount)) * csAmount);
        }
      } else {
        control.get(psQuantityName)?.setValue(
          (isNull(control.get(psQuantityName)?.getRawValue()) || control.get(psQuantityName)?.getRawValue() === '' ? null :
           (control.get(psQuantityName)?.getRawValue() === '0' ? '0' : null)
           )
          , { emitEvent: IsEventEmit ? true : false });
      }
    }
  }

  public static convertQuantityDefaultOutput(control: FormGroup, quantityName: string, isPackCsOutputName: string, isPackBlOutputName: string, isPieceOutputName: string,
    csQuantityName: string, blQuantityName: string, psQuantityName: string, billingPackTypeName: string, IsEventEmit?: boolean): void {

    let val = control.get(quantityName)?.getRawValue();
    let quantity;

    if (val && isString(val) && val.indexOf(',') > 0) {
      quantity = Number(val.replaceAll(',', ''));
    }
    else quantity = Number(val);

    if (quantity < 1) {
      control.get(csQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      control.get(blQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      control.get(psQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });

      return;
    }

    let isPackCsOutput = control.get(isPackCsOutputName)?.getRawValue();
    let isPackBlOutput = control.get(isPackBlOutputName)?.getRawValue();
    let isPieceOutput = control.get(isPieceOutputName)?.getRawValue();
    let billingPackType = control.get(billingPackTypeName)?.getRawValue();
    let packCsAmount = control.get('packCsAmount')?.getRawValue();
    let packBlAmount = control.get('packBlAmount')?.getRawValue();

    if (billingPackType === '3') {
      if (isPackCsOutput === '1') {
        let csAmount = ((packCsAmount ?? 0)
          * packBlAmount);

        if (csAmount > 0) {
          let quantityNew = quantity;

          control.get(csQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / csAmount) === 0 ?
            null : Math.floor(quantityNew / csAmount)), { emitEvent: IsEventEmit ? true : false });
          quantity = quantityNew - ((Math.floor(quantityNew / csAmount)) * csAmount);
        }
      } else {
        control.get(blQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      }

      if (isPackBlOutput === '1' && quantity > 0) {
        let quantityNew = quantity;

        control.get(blQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / packBlAmount) === 0 ?
          null : Math.floor(quantityNew / packBlAmount)), { emitEvent: IsEventEmit ? true : false });
        quantity = quantityNew - ((Math.floor(quantityNew / packBlAmount)) * packBlAmount);
      } else {
        control.get(psQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
        control.get(blQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      }

      if (isPieceOutput === '1' && quantity > 0) {
        control.get(psQuantityName)?.setValue(this.addThousandSparator(quantity === 0 ? null : quantity), { emitEvent: IsEventEmit ? true : false });
      } else {
        control.get(psQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      }
    }

    if (billingPackType === '2') {
      if (isPackCsOutput === '1') {
        let csAmount = ((packCsAmount ?? 0)
          * packBlAmount);

        if (csAmount > 0) {
          let quantityNew = quantity;

          control.get(csQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / csAmount) === 0 ?
            null : Math.floor(quantityNew / csAmount)), { emitEvent: IsEventEmit ? true : false });
          quantity = quantityNew - ((Math.floor(quantityNew / csAmount)) * csAmount);
        }
      } else {
        control.get(blQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
        control.get(psQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      }

      if (isPackBlOutput === '1' && quantity > 0) {
        let quantityNew = quantity;

        control.get(blQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / packBlAmount) === 0 ?
          null : Math.floor(quantityNew / packBlAmount)), { emitEvent: IsEventEmit ? true : false });
        quantity = quantityNew - ((Math.floor(quantityNew / packBlAmount)) * packBlAmount);
      } else {
        control.get(blQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      }
    }

    if (billingPackType === '1') {
      if (isPackCsOutput === '1') {
        let csAmount = ((packCsAmount ?? 0)
          * packBlAmount);

        if (csAmount > 0) {
          let quantityNew = quantity;

          control.get(csQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / csAmount) === 0 ? null :
            Math.floor(quantityNew / csAmount)), { emitEvent: IsEventEmit ? true : false });
          quantity = quantityNew - ((Math.floor(quantityNew / csAmount)) * csAmount);
        }
      } else {
      }
    }
  }

  public static convertQuantityDefaultReturnInput(control: FormGroup, quantityName: string, isPackCsOutputName: string, isPackBlOutputName: string, isPieceOutputName: string,
    csQuantityName: string, blQuantityName: string, psQuantityName: string, billingPackTypeName: string, IsEventEmit?: boolean): void {

    let val = control.get(quantityName)?.getRawValue();
    let quantity;

    if (val && isString(val) && val.indexOf(',') > 0) {
      quantity = Number(val.replaceAll(',', ''));
    }
    else quantity = Number(val);

    if (quantity < 1) {

      if (!control.get(csQuantityName)?.getError('required')) {
        control.get(csQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      }

      if (!control.get(blQuantityName)?.getError('required')) {
        control.get(blQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      }

      if (!control.get(psQuantityName)?.getError('required')) {
        control.get(psQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      }

      return;
    }

    let isPackCsOutput = control.get(isPackCsOutputName)?.getRawValue();
    let isPackBlOutput = control.get(isPackBlOutputName)?.getRawValue();
    let isPieceOutput = control.get(isPieceOutputName)?.getRawValue();
    let billingPackType = control.get(billingPackTypeName)?.getRawValue();
    let packCsAmount = control.get('packCsAmount')?.getRawValue();
    let packBlAmount = control.get('packBlAmount')?.getRawValue();

    if (billingPackType === '3') {
      if (isPackCsOutput === '1') {
        let csAmount = ((packCsAmount ?? 0)
          * packBlAmount);

        if (csAmount > 0) {
          let quantityNew = quantity;

          control.get(csQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / csAmount) === 0 ?
            null : Math.floor(quantityNew / csAmount)), { emitEvent: IsEventEmit ? true : false });
          quantity = quantityNew - ((Math.floor(quantityNew / csAmount)) * csAmount);
        }
      } else {
        control.get(blQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      }

      if (isPackBlOutput === '1' && quantity > 0) {
        let quantityNew = quantity;

        control.get(blQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / packBlAmount) === 0 ?
          null : Math.floor(quantityNew / packBlAmount)), { emitEvent: IsEventEmit ? true : false });
        quantity = quantityNew - ((Math.floor(quantityNew / packBlAmount)) * packBlAmount);
      } else {
        control.get(psQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
        control.get(blQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      }

      if (isPieceOutput === '1' && quantity > 0) {
        control.get(psQuantityName)?.setValue(this.addThousandSparator(quantity === 0 ? null : quantity), { emitEvent: IsEventEmit ? true : false });
      } else {
        control.get(psQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      }
    }

    if (billingPackType === '2') {
      if (isPackCsOutput === '1') {
        let csAmount = ((packCsAmount ?? 0)
          * packBlAmount);

        if (csAmount > 0) {
          let quantityNew = quantity;

          control.get(csQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / csAmount) === 0 ?
            null : Math.floor(quantityNew / csAmount)), { emitEvent: IsEventEmit ? true : false });
          quantity = quantityNew - ((Math.floor(quantityNew / csAmount)) * csAmount);
        }
      } else {
        control.get(blQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
        control.get(psQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      }

      if (isPackBlOutput === '1' && quantity > 0) {
        let quantityNew = quantity;

        control.get(blQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / packBlAmount) === 0 ?
          null : Math.floor(quantityNew / packBlAmount)), { emitEvent: IsEventEmit ? true : false });
        quantity = quantityNew - ((Math.floor(quantityNew / packBlAmount)) * packBlAmount);
      } else {
        control.get(blQuantityName)?.setValue(null, { emitEvent: IsEventEmit ? true : false });
      }
    }

    if (billingPackType === '1') {
      if (isPackCsOutput === '1') {
        let csAmount = ((packCsAmount ?? 0)
          * packBlAmount);

        if (csAmount > 0) {
          let quantityNew = quantity;

          control.get(csQuantityName)?.setValue(this.addThousandSparator(Math.floor(quantityNew / csAmount) === 0 ? null :
            Math.floor(quantityNew / csAmount)), { emitEvent: IsEventEmit ? true : false });
          quantity = quantityNew - ((Math.floor(quantityNew / csAmount)) * csAmount);
        }
      } else {
      }
    }
  }

  public static convertAlphaBetFullToHalf(element: FormGroup, name: string): string {
    const half = ['0', '1',
      '2', '3', '4', '5', '6', '7', '8', '9',
      '~', '!', '@', '#', '$', '%', '^', '&', '*',
      '(', ')', '-', '=', '+', '_',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
      'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '<', '>', '?', ':', ';', '|', '/'];

    const full = ['０', '１',
      '２', '３', '４', '５', '６', '７', '８', '９',
      '～', '！', '＠', '＃', '＄', '％', '＾', '＆', '＊',
      '（', '）', 'ー', '＝', '＋', '＿',
      'ａ', 'ｂ', 'ｃ', 'ｄ', 'ｅ', 'ｆ', 'ｇ', 'ｈ',
      'ｉ', 'ｊ', 'ｋ', 'ｌ', 'ｍ', 'ｎ', 'ｏ', 'ｐ',
      'ｑ', 'ｒ', 'ｓ', 'ｔ', 'ｕ', 'ｖ', 'W', 'ｘ', 'ｙ', 'ｚ',
      '＜', '＞', '？', '：', '；', '｜', '／'];


    let str0 = element.get(name)?.getRawValue();

    for (let i = 0; i < full.length; i++) {
      str0 = str0.replaceAll(full[i], half[i]);
      str0 = str0.replaceAll('ﾟ', '');
    }

    return str0;
  };

  public static formatDate(dateString: string): string {
    const dateParts = dateString.split('/');
    if (dateParts.length === 3) {
      const [year, month, day] = dateParts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateString; 
  }
  public static maxLength(max: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const value: string = control.value;
      if (value && value.length > parseInt(max, 10)) {
        return { 'maxLength': {max} };
      }
      return null;
    };
  }
  public static dateFormat (dateStr: string){
    let dateObj = new Date(dateStr);
    return dateObj.toISOString().split('T')[0];
  }
  
}
