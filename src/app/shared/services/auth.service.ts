import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Service } from './service';
import { SYMBOLS } from '../constants';
import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';

const store = require('store');

@Injectable()
export class AuthService extends Service {
  isLoggedIn: boolean = false;

  constructor(inject: Injector) {
    super(inject);
  }

  login(): Observable<any> {
    return Observable
      .of(true)
      .delay(1000)
      .do(val => this.isLoggedIn = true);
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  hasLocal(): boolean {
    return !!store.get(SYMBOLS.USER);
  }

  verify() {}
}
