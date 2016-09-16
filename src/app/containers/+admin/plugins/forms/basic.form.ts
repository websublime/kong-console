import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BasicModelConfig } from '../../../../shared';

@Injectable()
export class BasicFormConfig {
  formGroup: FormGroup;
  formModel: BasicModelConfig;

  createFormGroup() {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      hideCredentials: new FormControl(false)
    });
  }
}
