import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ControlBase, ControlSignature } from './control.base';
import { BasicModelConfig } from '../../../../shared';

@Injectable()
export class BasicFormConfig {
  title: string;
  formModel: BasicModelConfig;
  formControls: Array<ControlBase<any>> = [];

  constructor() {
    this.init();
  }

  init() {
    this.title = 'Basic Authorization';
    this.createFormControls();
    this.formModel = new BasicModelConfig();
  }

  createFormGroup(): FormGroup {
    let group: any = {};

    this.formControls.forEach(control => {
      group[control.key] = control.control;

      // control.control.valueChanges.subscribe((value) => { console.log(value); });
    });

    return new FormGroup(group);
  }

  help() {
    /* tslint:disable */
    return `
    <table class="table table-hover">
      <tr>
        <th>Attribute</th>
        <th>Description</th>
      </tr>
      <tr>
        <td><span class="badge-highlight">hide_credentials</span><br><em>optional</em></td>
        <td><p>An optional boolean value telling the plugin to hide the credential to the upstream API server. It will be removed by Kong before proxying the request.</p></td>
      </tr>
    </table>
    `;
    /* tslint:enable */
  }

  private createFormControls(): void {
    this.formControls = [
      new ControlBase<boolean>(<ControlSignature<boolean>>{
        type: 'checkbox',
        value: false,
        control: new FormControl(false),
        label: 'Hide Credentials',
        key: 'hideCredentials',
        errorMsg: null,
        required: false
      })
    ];
  }
}
