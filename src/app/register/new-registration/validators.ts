import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export class MyValidators {
  static haveNumber(patt: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return patt.test(control.value) ? null : { haveNumber: true };
    };
  }
  static haveStringMay(patt: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return patt.test(control.value) ? null : { haveStringMay: true };
    };
  }
  static haveStringMin(patt: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return patt.test(control.value) ? null : { haveStringMin: true };
    };
  }
  static haveCharacter(patt: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return patt.test(control.value) ? null : { haveCharacter: true };
    };
  }
  static haveSpace(patt: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return patt.test(control.value) ? null : { haveSpace: true };
    };
  }
}
export const confirm: ValidatorFn = (
  group: AbstractControl
): { [key: string]: any } | null => {
  let pass = group.get('password') as FormControl;
  let confirmPass = group.get('passwordConfirm') as FormControl;

  return pass.value === confirmPass.value ? null : { confirm: true };
};
