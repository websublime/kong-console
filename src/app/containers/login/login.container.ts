import { Component, OnInit } from '@angular/core';
import { Container, AuthService, State } from '../../shared';

@Component({
  moduleId: __filename,
  selector: 'login',
  templateUrl: './login.template.html'
})
export class Login extends Container implements OnInit {
  constructor(
    private _appState: State,
    private _authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    console.log(this._appState);
  }
}
