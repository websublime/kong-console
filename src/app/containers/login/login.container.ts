import { Component } from '@angular/core';
import { Container, AuthService } from '../../shared';

@Component({
  moduleId: __filename,
  selector: 'login',
  templateUrl: './login.template.html'
})
export class Login extends Container {
  constructor(
    private _authService: AuthService
  ) {
    super();
  }
}
