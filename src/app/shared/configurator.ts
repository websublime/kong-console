import { isObject } from 'lodash';
import { Injectable } from '@angular/core';

/**
 * Interface description for options
 *
 * @export
 * @interface Options
 */
export interface Options {
  [key: string]: any;
}

/**
 * Class to centralized configurations values. It has a default
 * looking for options on window.__ENV if exist, this object will
 * be copied to collection options on class.
 *
 * @export
 * @class Configurator
 */
@Injectable()
export class Configurator {
  private _repository: Options = <Options>{};

  constructor() {
    this._readGlobalConfig();
  }

  /**
   * Reads entries from __ENV if exist and
   * add to repository collection
   *
   * @private
   */
  private _readGlobalConfig(): void {
    if ((<any>window).hasOwnProperty('__ENV')) {
       this._flat((<any>window).__ENV);
    }
  }

  /**
   * Converts a tree object keys in flat
   * key string in one level.
   *
   * {
   *  name: '',
   *  profile: {
   *    email: ''
   *  }
   * }
   *
   * to: {'name': '', 'profile.email': ''}
   *
   * @private
   * @param {*} config (Configuration object)
   * @param {string} [key=''] (Append key tree to flat)
   */
  private _flat(config: any, key: string = '') {
    let path: string =+ (key === '') ? key : key+'.';

    Object.keys(config).forEach((key: string) => {
      if (isObject(config[key])) {
        this._flat(config[key], path+key);
      } else {
        this.setOption(`${path+key}`, config[key]);
      }
    });
  }

  setOption(name: string, value: any): void {
    this._repository[name] = value;
  }

  /**
   * Get a configuration value from the collection.
   *
   * @param {string} name (Key name on collection)
   * @param {*} [defaults=null] (Default value if not exist)
   * @returns {*}
   */
  getOption(name: string, defaults: any = null): any {
    return this.hasOption(name) ? this._repository[name] : defaults;
  }

  /**
   * Verify if option name exists on the collection.
   *
   * @param {string} name (description)
   * @returns {boolean} (description)
   */
  hasOption(name: string): boolean {
    return this._repository.hasOwnProperty(name);
  }
}
