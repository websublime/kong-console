import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateFile][formControlName],[validateFile][formControl],[validateFile][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => FileValidator), multi: true }
    ]
})
export class FileValidator implements Validator {
  validate(c: AbstractControl): { [key: string]: any } {
    return null;
  }
}
