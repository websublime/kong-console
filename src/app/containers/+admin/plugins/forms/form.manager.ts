import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ControlBase, ControlSignature } from './control.base';
import {
  BasicModelConfig, BasicModel, KeyModelConfig, KeyModel,
  OAuthModelConfig, OAuthModel
} from '../../../../shared';

export interface FormSettings {
  title: string;
  formModel: any;
  controls: Array<ControlBase<any>>;
  help?: string;
  attributes: Object;
  beforeUpdateModel?: Function;
};

export interface DynamicFormSettings {
  [key: string]: FormSettings;
};

export interface Manager {
  form: FormGroup;
  model: any;
  description: FormSettings;
}

export const FORM_SETTINGS: DynamicFormSettings = <DynamicFormSettings>{
  'basic-auth-config': {
    title: 'Basic Authorization',
    formModel: BasicModelConfig,
    controls: [
      new ControlBase<string>(<ControlSignature<string>>{
        type: 'text',
        value: '',
        control: new FormControl('', Validators.required),
        label: 'Name',
        key: 'name',
        errorMsg: null,
        required: true,
        render: false
      }),
      new ControlBase<boolean>(<ControlSignature<boolean>>{
        type: 'checkbox',
        value: false,
        control: new FormControl(false),
        label: 'Hide Credentials',
        key: 'hideCredentials',
        errorMsg: null,
        required: false,
        render: true
      })
    ],
    /* tslint:disable */
    help: `
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
    `,
    /* tslint:enable */
    attributes: {
      'name': 'name',
      'hideCredentials': 'config.hide_credentials'
    }
  },
  'basic-auth-consumer': {
    title: 'Basic Authorization',
    formModel: BasicModel,
    controls: [
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
    ],
    help: `
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
    `,
    attributes: {
      'username': 'username',
      'password': 'password'
    }
  },
  'key-auth-config': {
    title: 'Key Authentication',
    formModel: KeyModelConfig,
    controls: [
      new ControlBase<string>(<ControlSignature<string>>{
        type: 'text',
        value: '',
        control: new FormControl('', Validators.required),
        label: 'Name',
        key: 'name',
        errorMsg: null,
        required: true,
        render: false
      }),
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
    ],
    /* tslint:disable */
    help: `
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
    `,
    /* tslint:enable */
    attributes: {
      'name': 'name',
      'keyNames': 'config.key_names',
      'hideCredentials': 'config.hide_credentials'
    },
    beforeUpdateModel: (form: FormGroup) => {
      let keys = form.value.keyNames
        ? form.value.keyNames.split(',').map((value: string) => { return value.trim(); })
        : [];

      form.get('keyNames').setValue(keys);
    }
  },
  'key-auth-consumer': {
    title: 'Key Authentication',
    formModel: KeyModel,
    controls: [
      new ControlBase<string>(<ControlSignature<string>>{
        type: 'text',
        value: '',
        control: new FormControl(''),
        label: 'Key',
        key: 'key',
        errorMsg: null,
        required: false
      })
    ],
    /* tslint:disable */
    help: `
    <table class="table table-hover">
      <tr>
        <th>Attribute</th>
        <th>Description</th>
      </tr>
      <tr>
        <td><span class="badge-highlight">key</span><br><em>optional</em></td>
        <td><p>You can optionally set your own unique key to authenticate the client. If missing, the plugin will generate one.</p></td>
      </tr>
    </table>
    `,
    /* tslint:enable */
    attributes: {
      'key': 'key'
    }
  },
  'oauth2-config': {
    title: 'OAUTH 2 Authentication',
    formModel: OAuthModelConfig,
    controls: [
      new ControlBase<string>(<ControlSignature<string>>{
        type: 'text',
        value: '',
        control: new FormControl('', Validators.required),
        label: 'Name',
        key: 'name',
        errorMsg: null,
        required: true,
        render: false
      }),
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
        value: 7200,
        control: new FormControl(7200),
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
    ],
    /* tslint:disable */
    help: `
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
    `,
    /* tslint:enable */
    attributes: {
      'name': 'name',
      'acceptHttpIfAlreadyTerminated': 'config.accept_http_if_already_terminated',
      'hideCredentials': 'config.hide_credentials',
      'enablePasswordGrant': 'config.enable_password_grant',
      'enableImplicitGrant': 'config.enable_implicit_grant',
      'enableClientCredentials': 'config.enable_client_credentials',
      'enableAuthorizationCode': 'config.enable_authorization_code',
      'tokenExpiration': 'config.token_expiration',
      'mandatoryScope': 'config.mandatory_scope',
      'scopes': 'config.scopes'
    },
    beforeUpdateModel: (form: FormGroup) => {
      let scopes = form.value.scopes
        ? form.value.scopes.split(',').map(v => { return v.trim(); })
        : [];

      form.get('scopes').setValue(scopes);
    }
  },
  'oauth2-consumer': {
    title: 'OAUTH 2 Authentication',
    formModel: OAuthModel,
    controls: [
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
    ],
    /* tslint:disable */
    help: `
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
    `,
    /* tslint:enable */
    attributes: {
      'name': 'name',
      'clientId': 'client_id',
      'clientSecret': 'client_secret',
      'redirectUri': 'redirect_uri'
    }
  }
};

@Injectable()
export class FormManager {
  private settings: FormSettings;

  set description(settings: FormSettings) {
    throw new Error('Don\'t mutate description. Use init method.');
  }

  get description(): FormSettings {
    return this.settings;
  }

  init(settings: FormSettings): Manager {
    this.settings = settings;

    let form = this.createForm(settings.controls);
    let model = this.createModel();

    return {
      form: form,
      model: model,
      description: settings
    };
  }

  createForm(controls: Array<ControlBase<any>>): FormGroup {
    let group: any = {};

    controls.forEach(control => {
      group[control.key] = control.control;
    });

    return new FormGroup(group);
  }

  createModel() {
    return new this.settings.formModel();
  }
}
