import { Injectable } from '@angular/core';

@Injectable()
export abstract class ControlBase<ControlValue> {
  type: string;
  value: ControlValue;
  label: string;
  control: any;
  key: string;
  errorMsg: string;
  required: boolean;
}
