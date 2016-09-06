import { Component, OnInit } from '@angular/core';

import { State } from '../../core';

@Component({
  moduleId: __filename,
  selector: 'login-page',
  template: `
  <h1>Login Page</h1>
  <a routerLink="/">Home</a>
  <a routerLink="/admin">Admin</a>
  `
})
export class LoginContainer implements OnInit {
  constructor(private state: State) { }

  ngOnInit() {
    console.log('--LOGIN INITED--');
    this.state.set('ui', false);
    console.log(this.state);
  }
}
