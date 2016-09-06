import { Component, OnInit } from '@angular/core';

import { State } from '../../core';

@Component({
  moduleId: __filename,
  selector: 'login-page',
  templateUrl: './login.template.html'
})
export class LoginContainer implements OnInit {
  constructor(private state: State) { }

  ngOnInit() {
    console.log('--LOGIN INITED--');
    this.state.set('ui', false);
    console.log(this.state);
  }
}
