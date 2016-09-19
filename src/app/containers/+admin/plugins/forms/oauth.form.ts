import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { OAuthModelConfig, OAuthModel } from '../../../../shared';
import { ControlBase, ControlSignature } from './control.base';

@Injectable()
export class OAuthFormConfig {
  title: string;
  formModel: OAuthModelConfig;
  formControls: Array<ControlBase<any>> = [];

  constructor() {
    this.init();
  }

  init() {
    this.title = 'OAUTH 2 Authentication';
    this.createFormControls();
    this.formModel = new OAuthModelConfig();
  }

  createFormGroup(): FormGroup {
    let group: any = {};

    this.formControls.forEach(control => {
      group[control.key] = control.control;
    });

    return new FormGroup(group);
  }

  populate(form: any) {
    let scopes = form.scopes ? form.scopes.split(',').map(v => { return v.trim(); }) : [];

    this.formModel.setAttribute('config.scopes', scopes);
    this.formModel.setAttribute('config.mandatory_scope', form.mandatoryScope || false);
    this.formModel.setAttribute('config.token_expiration', form.tokenExpiration || 7200);
    /* tslint:disable */
    this.formModel.setAttribute('config.enable_authorization_code', form.enableAuthorizationCode || false);
    this.formModel.setAttribute('config.enable_client_credentials', form.enableClientCredentials || false);
    this.formModel.setAttribute('config.accept_http_if_already_terminated', form.acceptHttpIfAlreadyTerminated || false);
    /* tslint:enable */
    this.formModel.setAttribute('config.enable_implicit_grant', form.enableImplicitGrant || false);
    this.formModel.setAttribute('config.enable_password_grant', form.enablePasswordGrant || false);
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
        <td><span class="badge-highlight">scopes</span></td>
        <td><p>Describes an array of comma separated scope names that will be available to the end user.</p></td>
      </tr>
      <tr>
        <td><span class="badge-highlight">mandatory_scope</span><br><em>optional</em></td>
        <td><p>An optional boolean value telling the plugin to require at least one scope to be authorized by the end user.</p></td>
      </tr>
      <tr>
        <td><span class="badge-highlight">token_expiration</span><br><em>optional</em></td>
        <td><p>An optional integer value telling the plugin how long should a token last, after which the client will need to refresh the token. Set to <span class="badge-highlight">0</span> to disable the expiration.</p></td>
      </tr>
      <tr>
        <td><span class="badge-highlight">enable_authorization_code</span><br><em>optional</em></td>
        <td><p>An optional boolean value to enable the three-legged Authorization Code flow <a href="https://tools.ietf.org/html/rfc6749#section-4.1">(RFC 6742 Section 4.1)</a>.</p></td>
      </tr>
      <tr>
        <td><span class="badge-highlight">enable_client_credentials</span><br><em>optional</em></td>
        <td><p>An optional boolean value to enable the Client Credentials Grant flow <a href="https://tools.ietf.org/html/rfc6749#section-4.4">(RFC 6742 Section 4.4)</a>.</p></td>
      </tr>
      <tr>
        <td><span class="badge-highlight">enable_implicit_grant</span><br><em>optional</em></td>
        <td><p>An optional boolean value to enable the Implicit Grant flow which allows to provision a token as a result of the authorization process <a href="https://tools.ietf.org/html/rfc6749#section-4.2">(RFC 6742 Section 4.2)</a>.</p></td>
      </tr>
      <tr>
        <td><span class="badge-highlight">enable_password_grant</span><br><em>optional</em></td>
        <td><p>An optional boolean value to enable the Resource Owner Password Credentials Grant flow <a href="https://tools.ietf.org/html/rfc6749#section-4.3">(RFC 6742 Section 4.3)</a>.</p></td>
      </tr>
      <tr>
        <td><span class="badge-highlight">hide_credentials</span><br><em>optional</em></td>
        <td><p>An optional boolean value telling the plugin to hide the credential to the upstream API server. It will be removed by Kong before proxying the request.</p></td>
      </tr>
      <tr>
        <td><span class="badge-highlight">accept_http_if_already_terminated</span><br><em>optional</em></td>
        <td><p>Accepts HTTPs requests that have already been terminated by a proxy or load balancer and the <span class="badge-highlight">x-forwarded-proto: https</span> header has been added to the request. Only enable this option if the Kong server cannot be publicly accessed and the only entry-point is such proxy or load balancer.</p></td>
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
        control: new FormControl([], Validators.required),
        label: 'Scopes',
        key: 'scopes',
        errorMsg: null,
        required: true
      }),
      new ControlBase<boolean>(<ControlSignature<boolean>>{
        type: 'checkbox',
        value: false,
        control: new FormControl(false),
        label: 'Mandatory Scope',
        key: 'mandatoryScope',
        errorMsg: null,
        required: false
      }),
      new ControlBase<number>(<ControlSignature<number>>{
        type: 'number',
        value: 0,
        control: new FormControl(0),
        label: 'Token Expiration',
        key: 'tokenExpiration',
        errorMsg: null,
        required: false
      }),
      new ControlBase<boolean>(<ControlSignature<boolean>>{
        type: 'checkbox',
        value: false,
        control: new FormControl(false),
        label: 'Enable Authorization Code',
        key: 'enableAuthorizationCode',
        errorMsg: null,
        required: false
      }),
      new ControlBase<boolean>(<ControlSignature<boolean>>{
        type: 'checkbox',
        value: false,
        control: new FormControl(false),
        label: 'Enable Client Credentials',
        key: 'enableClientCredentials',
        errorMsg: null,
        required: false
      }),
      new ControlBase<boolean>(<ControlSignature<boolean>>{
        type: 'checkbox',
        value: false,
        control: new FormControl(false),
        label: 'Enable Implicit Grant',
        key: 'enableImplicitGrant',
        errorMsg: null,
        required: false
      }),
      new ControlBase<boolean>(<ControlSignature<boolean>>{
        type: 'checkbox',
        value: false,
        control: new FormControl(false),
        label: 'Enable Password Grant',
        key: 'enablePasswordGrant',
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
      }),
      new ControlBase<boolean>(<ControlSignature<boolean>>{
        type: 'checkbox',
        value: false,
        control: new FormControl(false),
        label: 'Accept Http if Already Terminated',
        key: 'acceptHttpIfAlreadyTerminated',
        errorMsg: null,
        required: false
      })
    ];
  }
}

@Injectable()
export class OAuthFormResource {
  title: string;
  formModel: OAuthModel;
  formControls: Array<ControlBase<any>> = [];

  constructor() {
    this.init();
  }

  init() {
    this.title = 'OAUTH 2 Authentication';
    this.createFormControls();
    this.formModel = new OAuthModel();
  }

  createFormGroup(): FormGroup {
    let group: any = {};

    this.formControls.forEach(control => {
      group[control.key] = control.control;
    });

    return new FormGroup(group);
  }

  populate(form: any) {
    this.formModel.setAttribute('name', form.name);
    this.formModel.setAttribute('client_id', form.clientId);
    this.formModel.setAttribute('client_secret', form.clientSecret);
    this.formModel.setAttribute('redirect_uri', form.redirectUri);
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
        <td><span class="badge-highlight">name</span></td>
        <td><p>The name to associate to the credential. In OAuth 2.0 this would be the application name.</p></td>
      </tr>
      <tr>
        <td><span class="badge-highlight">client_id</span><br><em>optional</em></td>
        <td><p>You can optionally set your own unique <span class="badge-highlight">client_id</span>. If missing, the plugin will generate one.</p></td>
      </tr>
      <tr>
        <td><span class="badge-highlight">client_secret</span><br><em>optional</em></td>
        <td><p>You can optionally set your own unique <span class="badge-highlight">client_secret</span>. If missing, the plugin will generate one.</p></td>
      </tr>
      <tr>
        <td><span class="badge-highlight">redirect_uri</span></td>
        <td><p>The URL in your app where users will be sent after authorization <a href="https://tools.ietf.org/html/rfc6749#section-3.1.2">(RFC 6742 Section 3.1.2)</a>.</p></td>
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
        label: 'Name',
        key: 'name',
        errorMsg: null,
        required: true,
        holder: 'Great Application'
      }),
      new ControlBase<string>(<ControlSignature<string>>{
        type: 'text',
        value: '',
        control: new FormControl(''),
        label: 'Client ID',
        key: 'clientId',
        errorMsg: null,
        required: false
      }),
      new ControlBase<string>(<ControlSignature<string>>{
        type: 'text',
        value: '',
        control: new FormControl(''),
        label: 'Client Secret',
        key: 'clientSecret',
        errorMsg: null,
        required: false
      }),
      new ControlBase<string>(<ControlSignature<string>>{
        type: 'text',
        value: '',
        control: new FormControl('', Validators.required),
        label: 'Redirect URI',
        key: 'redirectUri',
        errorMsg: null,
        required: false,
        holder: 'http://some-domain/endpoint/'
      })
    ];
  }
}
