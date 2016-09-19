import { Injectable } from '@angular/core';

import { KeyFormConfig, KeyFormResource } from './key.form';
import { HmacFormConfig, HmacFormResource } from './hmac.form';
import { OAuthFormConfig, OAuthFormResource } from './oauth.form';
import { BasicFormConfig, BasicFormResource } from './basic.form';

@Injectable()
export class FormService {
  getFormGroup(group: string): (
    BasicFormConfig | BasicFormResource | KeyFormConfig | KeyFormResource |
    OAuthFormConfig | OAuthFormResource | HmacFormConfig | HmacFormResource
  ) {
    switch (group) {
      case 'basic-auth-config':
        return new BasicFormConfig();
      case 'basic-auth-consumer':
        return new BasicFormResource();
      case 'key-auth-config':
        return new KeyFormConfig();
      case 'key-auth-consumer':
        return new KeyFormResource();
      case 'oauth2-config':
        return new OAuthFormConfig();
      case 'oauth2-consumer':
        return new OAuthFormResource();
      case 'hmac-auth-config':
        return new HmacFormConfig();
      case 'hmac-auth-consumer':
        return new HmacFormResource();
      default:
        throw new Error('Unknow Form service: ' + group);
    }
  }
}
