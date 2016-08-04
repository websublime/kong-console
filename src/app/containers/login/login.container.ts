import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Container, AuthService, State, SYMBOLS, makeSymbolPath } from '../../shared';

@Component({
  moduleId: __filename,
  selector: 'login',
  templateUrl: './login.template.html'
})
export class Login extends Container implements OnInit {
  loginForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private _router: Router,
    private _appState: State,
    private _authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this._appState.set(makeSymbolPath([SYMBOLS.UI, SYMBOLS.HEADER]), false);
    this._appState.set(makeSymbolPath([SYMBOLS.UI, SYMBOLS.SIDEBAR]), false);
    this._appState.set(makeSymbolPath([SYMBOLS.UI, SYMBOLS.FOOTER]), false);

    this.loginForm = this.fb.group({
      'mail': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.required]
    });
  }

  onSubmit(form: FormControl) {
    if (!form.valid) {
      return;
    }

    this._authService
      .login()
      .subscribe(
        (rs: any) => {
          // this._router.navigate(['/admin']);
          console.log('Logged in');
        },
        (error: Error) => {
          console.log(error);
        }
      );
  }
}
