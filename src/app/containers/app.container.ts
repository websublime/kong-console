import { Component, OnInit } from '@angular/core';
import { Configurator, Container } from '../shared';

@Component({
  moduleId: __filename,
  selector: 'app',
  template: `
    <h1>Welcome to Angular2 Boilerplate</h1>
    <h2>Current environment is: {{env}}.</h2>
    <router-outlet></router-outlet>
  `
})
export class App extends Container implements OnInit {
  env: string;

  constructor(private _configurator: Configurator) {
    super();
  }

  ngOnInit() {
    this.env = this._configurator.getOption('ENVIRONMENT', 'NONE');
  }
}
