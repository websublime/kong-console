import 'rxjs/add/operator/do';
import { Service } from './service';
import { SYMBOLS } from '../constants';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Persistence } from '../core/persistence';
import { Configurator } from '../core/configurator';
import { RestAdapter } from '../adapters/rest.adapter';
import { Injectable, Injector } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { KongModel } from '../models/kong.model';

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
    const BASEAPIURL = this._configurator.getOption('API.URL');

    let encoded: string = btoa(
      `${credentials.username.value.split('@')[0]}:${credentials.password.value}`
    );

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + encoded);
    // headers.append('Content-Type', 'application/json');
    let reqOptions = new RequestOptions({ headers: headers, withCredentials: false });

    return this.adapter
      .get(BASEAPIURL, reqOptions)
      .do((response) => {
        if (response.ok) {
          this.isLoggedIn = true;

          this._persistence.set(SYMBOLS.USER, {
            key: encoded,
            user: credentials.username.value
          });
        }
      })
      .flatMap((response) => {
        return Observable.of(new KongModel(response.data));
      });
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  hasLocal(): boolean {
    return !!this._persistence.get(SYMBOLS.USER);
  }

  verify() {}
}
