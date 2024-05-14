import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkFromDate(formControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let val = control.value;
    console.log(val);

    // if (!control.parent?.get(formControlName)?.errors?.['matDatepickerParse'] &&
    //   !control.parent?.get(formControlName)?.errors?.['required'] &&
    //   !control.parent?.get(formControlName)?.errors?.['errorEnterPastDate'] &&
    //   !control.parent?.get(formControlName)?.errors?.['matDatepickerMin']) {
    //   control.parent?.get(formControlName)?.setErrors(null);
    // }

    if (control.parent?.get(formControlName)?.errors != null || control.parent?.get(formControlName)?.errors !=undefined ) {
      control.parent?.get(formControlName)?.setErrors(null);
    }

    if (val === null || val === '') return null;

    console.log(control.parent?.get(formControlName)?.value);

    if (
      control.parent?.get(formControlName)?.value === null ||
      control.parent?.get(formControlName)?.value === ''
    )
      return null;

    if (val > control.parent?.get(formControlName)?.value) {
      console.log('aaa');

      control.parent?.get(formControlName)?.setErrors({ dateInvalidTo: true });

      return { dateInvalidFrom: true };
    }

    return null;
  };
}

export function checkToDate(formControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let val = control.value;

    // if (!control.parent?.get(formControlName)?.errors?.['matDatepickerParse'] &&
    //   !control.parent?.get(formControlName)?.errors?.['required'] &&
    //   !control.parent?.get(formControlName)?.errors?.['errorEnterPastDate'] &&
    //   !control.parent?.get(formControlName)?.errors?.['matDatepickerMin']) {
    //   control.parent?.get(formControlName)?.setErrors(null);
    // }

    if (control.parent?.get(formControlName)?.errors !=null || control.parent?.get(formControlName)?.errors != undefined) {
      control.parent?.get(formControlName)?.setErrors(null);
      console.log(control.parent?.get(formControlName)?.errors);
      
    }

    if (val === null || val === '') return null;

    console.log('To Value', val);
    console.log('From Value', control.parent?.get(formControlName)?.value);

    if (
      control.parent?.get(formControlName)?.value === null ||
      control.parent?.get(formControlName)?.value === ''
    ) {return null;}
      

    if (control.parent?.get(formControlName)?.value > val) {
      console.log('bbbbbbb');
      
      control.parent
        ?.get(formControlName)
        ?.setErrors({ dateInvalidFrom: true });

      return { dateInvalidTo: true };
    }

    return null;
  };
}

export function checkFromValue(formControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let val = +control.value;
    console.log(val);

    if (control.parent?.get(formControlName)?.errors != null || control.parent?.get(formControlName)?.errors !=undefined ) {
      control.parent?.get(formControlName)?.setErrors(null);
    }

    if (val === null) return null;

    if (
      control.parent?.get(formControlName)?.value === null ||
      control.parent?.get(formControlName)?.value === ''
    )
      return null;

    console.log(+control.parent?.get(formControlName)?.value);

    if (val > +control.parent?.get(formControlName)?.value) {

      control.parent?.get(formControlName)?.setErrors({ valueInvalidTo: true });

      return { valueInvalidFrom: true };
    }

    return null;
  };
}

export function checkToValue(formControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let val = +control.value;

    if (control.parent?.get(formControlName)?.errors !=null || control.parent?.get(formControlName)?.errors != undefined) {
      control.parent?.get(formControlName)?.setErrors(null);
      console.log(control.parent?.get(formControlName)?.errors);
      
    }

    if (val === null ) return null;

    console.log('To Value', val);
    console.log('From Value', +control.parent?.get(formControlName)?.value);

    if (
      control.parent?.get(formControlName)?.value === null ||
      control.parent?.get(formControlName)?.value === ''
    ) {return null;}
      

    if (+control.parent?.get(formControlName)?.value > val) {
      console.log('Check to value');
      
      control.parent
        ?.get(formControlName)
        ?.setErrors({ valueInvalidFrom: true });

      return { valueInvalidTo: true };
    }

    return null;
  };
}

export function checkFromCode(formControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let val = control.value;
    console.log(val);

    if (control.parent?.get(formControlName)?.errors != null || control.parent?.get(formControlName)?.errors !=undefined ) {
      control.parent?.get(formControlName)?.setErrors(null);
    }

    if (val === null) return null;

    if (
      control.parent?.get(formControlName)?.value === null ||
      control.parent?.get(formControlName)?.value === ''
    )
      return null;

    console.log(control.parent?.get(formControlName)?.value);
    

    if (val > control.parent?.get(formControlName)?.value) {

      control.parent?.get(formControlName)?.setErrors({ valueInvalidTo: true });

      return { valueInvalidFrom: true };
    }

    return null;
  };
}
