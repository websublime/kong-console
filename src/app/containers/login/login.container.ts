import { Component, OnInit, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { State } from '../../core';
import { AuthService, SYMBOLS } from '../../shared';

@Component({
  moduleId: __filename,
  selector: 'login-page',
  templateUrl: './login.template.html'
})
export class LoginContainer implements OnInit {
  constructor(
    private state: State,
    private auth: AuthService
  ) { }

  ngOnInit() {
    console.log('--LOGIN INITED--');
    this.state.set('ui', false);
    console.log(this.state, this.auth);
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate() {
    return this.loginAccess()
      .do((logged) => {
        if (!logged) {
          this.router.navigate([SYMBOLS.ROUTES.ADMIN]);
        }
      });
  }

  private loginAccess(): Observable<boolean> {
    if (this.authService.isLoggedIn) {
      return Observable.of(false);
    }

    if (this.authService.hasLocal()) {
      return this.authService.verify()
        .flatMap((rs) => {
          return Observable.of(false);
        })
        .catch(() => {
          return Observable.of(true);
        });
    } else {
      return Observable.of(true);
    }
  }
}
