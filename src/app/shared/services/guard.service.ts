import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { SYMBOLS } from '../constants';
import { AuthService } from './auth.service';

@Injectable()
export class GuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate() {
    /*let url: string = this.router.url;
    let isAdmin: boolean = /(?:\/admin)/.test(url);*/

    return this.adminAccess()
      .do((logged) => {
        if (!logged) {
          this.router.navigate([SYMBOLS.ROUTES.LOGIN]);
        }
      });
  }

  private adminAccess(): Observable<boolean> {
    if (this.authService.isLoggedIn) {
      return Observable.of(true);
    }

    if (this.authService.hasLocal()) {
      return this.authService.verify()
        .flatMap((rs) => {
          return Observable.of(true);
        })
        .catch(() => {
          return Observable.of(false);
        });
    } else {
      return Observable.of(false);
    }
  }
}
