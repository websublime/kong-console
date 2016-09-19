import { Injectable } from '@angular/core';

import { BasicFormConfig, BasicFormResource } from './basic.form';

@Injectable()
export class FormService {
  getFormGroup(group: string): (BasicFormConfig | BasicFormResource) {
    switch (group) {
      case 'basic-auth-config':
        return new BasicFormConfig();
      case 'basic-auth-consumer':
        return new BasicFormResource();
      default:
        throw new Error('Unknow Form service: ' + group);
    }
  }
}
