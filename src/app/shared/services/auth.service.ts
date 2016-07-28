import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { SYMBOLS } from '../constants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const store = require('store');

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

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
