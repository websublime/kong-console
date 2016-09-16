import { Injectable } from '@angular/core';

import { BasicFormConfig } from './basic.form';

@Injectable()
export class FormService {
  getFormGroup(group: string) {
    switch (group) {
      case 'basic-auth':
        return new BasicFormConfig();
      default:
        throw new Error('Unknow Form service: ' + group);
    }
  }
}
