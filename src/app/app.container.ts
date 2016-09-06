import { Component, OnInit } from '@angular/core';

import { Driver, AuthService } from './shared';
import { State, Configurator } from './core';

@Component({
  moduleId: __filename,
  selector: 'app',
  template: '<router-outlet></router-outlet>'
})
export class AppContainer implements OnInit {
  constructor(
    private state: State,
    private adapter: Driver,
    private auth: AuthService,
    private config: Configurator
  ) { }

  ngOnInit() {
    console.log('--APP CONTAINER INITED--');
    console.log(this.state, this.config, this.adapter, this.auth);
  }
}
