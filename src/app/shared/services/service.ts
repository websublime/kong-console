import { Adapter } from '../adapters';
import { Injectable, Injector } from '@angular/core';

/**
 * Class to be extended and have driver adapter
 * defined to use to comunicate with any service you have defined on Configurator.
 * Current only Rest driver exist.
 *
 * @export
 * @abstract
 * @class Service
 */
@Injectable()
export abstract class Service<GenericDriver> {
  adapter: GenericDriver;

  constructor(private _injector: Injector) {
    /*let reflectiveInjector: ReflectiveInjector = <ReflectiveInjector>injector;
    console.log(injector, reflectiveInjector);
    let other = reflectiveInjector.resolveAndInstantiate(OtherDependency);*/
    this._initAdapter();
  }

  /**
   * Define driver to be used.
   *
   * @private
   */
  private _initAdapter(): void {
    let adapterProvider: Adapter = this._injector.get(Adapter);

    this.adapter = adapterProvider.adapter;
  }
}
