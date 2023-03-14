import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(control: AbstractControl): { [key: string]: any } | null {
  const emailRegex =
    /^([a-zA-Z0-9_.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})$/;
  const value = control.value;
  const result = emailRegex.test(value);

  if (result) return null; // означает, что ошибок нет
  else
    return {
      emailValidator: {
        value,
      },
    };
}

export function rangeValidator(minValue: number, maxValue: number): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const value = +control.value
    if (isNaN(value)) return {rangeValidator: {value}}
    if(value < minValue) return {minRange: {value}}
    if(value > maxValue) return {maxRange: {value}}
    return null
  }
}

export function matchPasswordValidator(primePassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log(primePassword)
    console.log('hi')
    return null
  }
}


/* https://fireflysemantics.medium.com/validating-passwords-in-angular-reactive-forms-f0dc5637cb9b */