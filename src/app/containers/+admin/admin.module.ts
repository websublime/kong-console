import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ROUTING } from './admin.routes';
import { DashboardContainer } from './dashboard';

@NgModule({
  imports: [ CommonModule, ROUTING ],
  declarations: [ DashboardContainer ],
  exports: [ DashboardContainer ]
})
export default class AdminModule {
  static routes = ROUTING;
  constructor()  {
    console.log('--ADMIN MODULE INITED--');
  }
}
