import { Subject } from 'rxjs/Subject';
import { get, has, set } from 'lodash';
import { Observable } from 'rxjs/Observable';

export abstract class BaseModel {
  private _subject: Subject<any>;

  constructor() {
    this._subject = new Subject();
  }

  hasAttribute(attribute: string): boolean {
    return has(this, attribute);
  }

  setAttribute(key: string, value: any): void {
    set(this, key, value);
    this._subject.next(this);
  }

  getAttribute(key: string): any {
    return get(this, key, undefined);
  }

  observe(): Observable<any> {
    return this._subject.asObservable();
  }
}
