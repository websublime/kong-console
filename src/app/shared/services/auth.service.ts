import 'rxjs/add/operator/do';
import { Service } from './service';
import { SYMBOLS } from '../constants';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { KongModel } from '../models/kong.model';
import { Persistence } from '../core/persistence';
import { Configurator } from '../core/configurator';
import { Injectable, Injector } from '@angular/core';
import { RestAdapter } from '../adapters/rest.adapter';
import { Headers, RequestOptions } from '@angular/http';

export interface CredentialsBasic {
  password: FormControl;
  username: FormControl;
}

@Injectable()
export class AuthService extends Service<RestAdapter> {
  isLoggedIn: boolean = false;

  private _persistence: Persistence;

  constructor(inject: Injector, private _configurator: Configurator) {
    super(inject);

    this._persistence = inject.get(Persistence);
  }

  login(credentials: CredentialsBasic): Observable<KongModel> {

    let encoded: string = btoa(
      `${credentials.username.value.split('@')[0]}:${credentials.password.value}`
    );

    return this._performLogin({ key: encoded, user: credentials.username.value });
  }

  logout(): void {
    this.isLoggedIn = false;
    this._persistence.clear();
  }

  hasLocal(): boolean {
    return !!this._persistence.get(SYMBOLS.USER);
  }

  verify(): Observable<KongModel> {
    let localData: {key: string, user: string} = this._persistence.get(SYMBOLS.USER);

    return this._performLogin(localData);
  }

  private _performLogin(persistence: {key: string, user: string}): Observable<KongModel> {
    const BASEAPIURL = this._configurator.getOption('API.URL');

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + persistence.key);
    // headers.append('Content-Type', 'application/json');
    let reqOptions = new RequestOptions({ headers: headers, withCredentials: false });

    return this.adapter
      .get(BASEAPIURL, reqOptions)
      .do((response) => {
        if (response.ok) {
          this.isLoggedIn = true;

          if (!this.hasLocal()) {
            this._persistence.set(SYMBOLS.USER, {
              key: persistence.key,
              user: persistence.user
            });
          }
        }
      })
      .flatMap((response) => {
        return Observable.of(new KongModel(response.data));
      });
  }
}
