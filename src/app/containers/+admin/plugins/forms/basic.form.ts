import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BasicModelConfig, BasicModel } from '../../../../shared';
import { ControlBase, ControlSignature } from './control.base';

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
    });

    return new FormGroup(group);
  }

  populate(form: any) {
    this.formModel.setAttribute('config.hide_credentials', form.hideCredentials || false);
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

@Injectable()
export class BasicFormResource {
  title: string;
  formModel: BasicModel;
  formControls: Array<ControlBase<any>> = [];

  constructor() {
    this.init();
  }

  init() {
    this.title = 'Basic Authorization';
    this.createFormControls();
    this.formModel = new BasicModel();
  }

  createFormGroup(): FormGroup {
    let group: any = {};

    this.formControls.forEach(control => {
      group[control.key] = control.control;
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
        <td><span class="badge-highlight">username</span></td>
        <td><p>The username to use in the Basic Authentication.</p></td>
      </tr>
      <tr>
        <td><span class="badge-highlight">password</span><br><em>semi-optional</em></td>
        <td><p>The password to use in the Basic Authentication.</p></td>
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
        type: 'password',
        value: '',
        control: new FormControl(''),
        label: 'Password',
        key: 'password',
        errorMsg: null,
        required: false
      })
    ];
  }
}
