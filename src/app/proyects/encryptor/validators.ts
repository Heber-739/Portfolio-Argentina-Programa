import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class EncryptorValidators {
  static asciiCharRange(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.haveErrors(control.value) ? { asciiCharRange: true } : null;
    };
  }
  static haveErrors(test: string): boolean {
    let haveError: boolean = false;
    for (let i = 0; i < test.length; i++) {
      let char: number = test.charCodeAt(i);
      if (char < 32 || char > 127) {
        haveError = true;
        break;
      }
    }
    return haveError;
  }
}
