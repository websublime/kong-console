import { Injectable } from '@angular/core';

import { KeyFormConfig, KeyFormResource } from './key.form';
import { OAuthFormConfig, OAuthFormResource } from './oauth.form';
import { BasicFormConfig, BasicFormResource } from './basic.form';

@Injectable()
export class FormService {
  getFormGroup(group: string): (
    BasicFormConfig | BasicFormResource | KeyFormConfig | KeyFormResource |
    OAuthFormConfig | OAuthFormResource
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
      default:
        throw new Error('Unknow Form service: ' + group);
    }
  }
}
