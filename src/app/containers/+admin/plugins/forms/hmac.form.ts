import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HMacModelConfig, HMacModel } from '../../../../shared';
import { ControlBase, ControlSignature } from './control.base';

@Injectable()
export class HmacFormConfig {
  title: string;
  formModel: HMacModelConfig;
  formControls: Array<ControlBase<any>> = [];

  constructor() {
    this.init();
  }

  init() {
    this.title = 'HMAC Authentication';
    this.createFormControls();
    this.formModel = new HMacModelConfig();
  }

  createFormGroup(): FormGroup {
    let group: any = {};

    this.formControls.forEach(control => {
      group[control.key] = control.control;
    });

    return new FormGroup(group);
  }

  populate(form: any) {
    this.formModel.setAttribute('config.hide_credentials', form.hideCredentials || false);
    this.formModel.setAttribute('config.clock_skew', form.clockSkew || 300);
    this.formModel.setAttribute('name', form.name);
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
      <tr>
        <td><span class="badge-highlight">clock_skew</span><br><em>optional</em></td>
        <td><p>Clock Skew in seconds to prevent replay attacks.</p></td>
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
      }),
      new ControlBase<number>(<ControlSignature<number>>{
        type: 'number',
        value: 300,
        control: new FormControl(300),
        label: 'Clock Skew',
        key: 'clockSkew',
        errorMsg: null,
        required: false
      })
    ];
  }
}

@Injectable()
export class HmacFormResource {
  title: string;
  formModel: HMacModel;
  formControls: Array<ControlBase<any>> = [];

  constructor() {
    this.init();
  }

  init() {
    this.title = 'HMAC Authentication';
    this.createFormControls();
    this.formModel = new HMacModel();
  }

  createFormGroup(): FormGroup {
    let group: any = {};

    this.formControls.forEach(control => {
      group[control.key] = control.control;
    });

    return new FormGroup(group);
  }

  populate(form: any) {
    this.formModel.setAttribute('username', form.username);
    this.formModel.setAttribute('secret', form.secret);
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
        <td><span class="badge-highlight">username</span></td>
        <td><p>The username to use in the HMAC Signature verification.</p></td>
      </tr>
      <tr>
        <td><span class="badge-highlight">secret</span><br><em>optional</em></td>
        <td><p>The secret to use in the HMAC Signature verification.</p></td>
      </tr>
    </table>
    `;
    /* tslint:enable */
  }

  private createFormControls(): void {
    this.formControls = [
      new ControlBase<string>(<ControlSignature<string>>{
        type: 'text',
        value: '',
        control: new FormControl('', Validators.required),
        label: 'Username',
        key: 'username',
        errorMsg: null,
        required: true
      }),
      new ControlBase<string>(<ControlSignature<string>>{
        type: 'text',
        value: '',
        control: new FormControl(''),
        label: 'Secret',
        key: 'secret',
        errorMsg: null,
        required: false
      })
    ];
  }
}
