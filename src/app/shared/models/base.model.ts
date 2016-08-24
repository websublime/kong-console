import { get, has, set } from 'lodash';

export abstract class BaseModel {
  hasAttribute(attribute: string): boolean {
    return has(this, attribute);
  }

  setAttribute(key: string, value: any): void {
    set(this, key, value);
  }

  getAttribute(key: string): any {
    return get(this, key, undefined);
  }
}
