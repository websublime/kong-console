import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { KeyModelConfig, KeyModel } from '../../../../shared';
import { ControlBase, ControlSignature } from './control.base';

@Injectable()
export class KeyFormConfig {
  title: string;
  formModel: KeyModelConfig;
  formControls: Array<ControlBase<any>> = [];

  constructor() {
    this.init();
  }

  init() {
    this.title = 'Key Authentication';
    this.createFormControls();
    this.formModel = new KeyModelConfig();
  }

  createFormGroup(): FormGroup {
    let group: any = {};

    this.formControls.forEach(control => {
      group[control.key] = control.control;
    });

    return new FormGroup(group);
  }

  populate(form: any) {
    let keys = form.keyNames ? form.keyNames.split(',') : [];

    keys = keys.map((value: string) => { return value.trim(); });

    this.formModel.setAttribute('name', form.name);
    this.formModel.setAttribute('config.hide_credentials', form.hideCredentials || false);
    this.formModel.setAttribute('config.key_names', keys);
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
        <td><span class="badge-highlight">key_names</span><br><em>optional</em></td>
        <td><p>Describes an array of comma separated parameter names where the plugin will look for a key. The client must send the authentication key in one of those key names, and the plugin will try to read the credential from a header or the querystring parameter with the same name.</p></td>
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
      new ControlBase<Array<string>>(<ControlSignature<Array<string>>>{
        type: 'text',
        value: [],
        control: new FormControl(),
        label: 'Key Names',
        key: 'keyNames',
        errorMsg: null,
        required: false
      }),
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
export class KeyFormResource {
  title: string;
  formModel: KeyModel;
  formControls: Array<ControlBase<any>> = [];

  constructor() {
    this.init();
  }

  init() {
    this.title = 'Key Authentication';
    this.createFormControls();
    this.formModel = new KeyModel();
  }

  createFormGroup(): FormGroup {
    let group: any = {};

    this.formControls.forEach(control => {
      group[control.key] = control.control;
    });

    return new FormGroup(group);
  }

  populate(form: any) {
    this.formModel.setAttribute('key', form.key || '');
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
        <td><span class="badge-highlight">key</span></td>
        <td><p>You can optionally set your own unique key to authenticate the client. If missing, the plugin will generate one.</p></td>
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
        control: new FormControl(''),
        label: 'Key',
        key: 'key',
        errorMsg: null,
        required: true
      })
    ];
  }
}
