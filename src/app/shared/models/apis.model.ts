import { has, isObject } from 'lodash';
import { Injectable } from '@angular/core';
import { BaseModel, BaseModelCollection } from './base.model';

export interface ApisModelResource {
  id: string;
  name: string;
  request_host: string;
  request_path: string;
  upstream_url: string;
}

@Injectable()
export class ApisModel extends BaseModel {
  id?: string;
  name?: string;
  /* tslint:disable */
  request_host?: string;
  request_path?: string;
  upstream_url?: string;
  /* tslint:enable */
  collection?: BaseModelCollection<ApisModelResource>;

  constructor(data?: ApisModelResource | BaseModelCollection<ApisModelResource>) {
    super();

    if (has(data, 'data')) {
      this._setCollection(<BaseModelCollection<ApisModelResource>>data);
    } else if (isObject(data)) {
      Object.assign(this, data);
    }
  }

  private _setCollection(collection: BaseModelCollection<ApisModelResource>) {
    collection.data.forEach((value, index) => {
      collection.data[index] = new ApisModel(<ApisModelResource>value);
    });

    this.collection = collection;
  }
}
