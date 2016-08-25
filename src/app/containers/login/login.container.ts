import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {
  Container,
  AuthService,
  State,
  SYMBOLS,
  makeSymbolPath,
  CredentialsBasic,
  KongModel
} from '../../shared';

@Component({
  moduleId: __filename,
  selector: 'login',
  templateUrl: './login.template.html'
})
export class Login extends Container implements OnInit {
  loginForm: FormGroup;
  invalid: boolean = false;

  constructor(
    public fb: FormBuilder,
    private _router: Router,
    private _appState: State,
    private _authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    if (!this._authService.isLoggedIn) {
      this._authService.logout();
    }

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

    let credentials: CredentialsBasic = <CredentialsBasic>{
      username: form.get('mail'),
      password: form.get('password')
    };

    this._authService
      .login(credentials)
      .subscribe(
        (model: KongModel) => {
          this._appState.set(makeSymbolPath([SYMBOLS.DATA, SYMBOLS.MODELS.KONG]), model);
          this.invalid = false;
          this._router.navigate([SYMBOLS.ROUTES.ADMIN]);
        },
        (error: Error) => {
          this.invalid = true;
        },
        () => {
          if (this._authService.isLoggedIn) {
            this._appState.set(makeSymbolPath([SYMBOLS.UI, SYMBOLS.HEADER]), true);
            this._appState.set(makeSymbolPath([SYMBOLS.UI, SYMBOLS.SIDEBAR]), true);
            this._appState.set(makeSymbolPath([SYMBOLS.UI, SYMBOLS.FOOTER]), true);
          }
        }
      );
  }
}
