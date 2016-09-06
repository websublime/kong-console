import { Component, OnInit } from '@angular/core';

import { State } from '../../../core';

@Component({
  moduleId: __filename,
  selector: 'dashboard-page',
  template: `
  <h1>Welcome to Dashboard</h1>
  <a routerLink="/">Home</a>
  <router-outlet></router-outlet>
  `
})
export class DashboardContainer implements OnInit {
  constructor(private state: State) { }

  ngOnInit() {
    console.log('--DASHBOARD INITED--');
    console.log(this.state);
  }
}
