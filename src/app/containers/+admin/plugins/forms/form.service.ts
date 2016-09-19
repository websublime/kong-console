import { Injectable } from '@angular/core';

import { KeyFormConfig, KeyFormResource } from './key.form';
import { BasicFormConfig, BasicFormResource } from './basic.form';

@Injectable()
export class FormService {
  getFormGroup(group: string): (
    BasicFormConfig | BasicFormResource | KeyFormConfig | KeyFormResource
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
      default:
        throw new Error('Unknow Form service: ' + group);
    }
  }
}
