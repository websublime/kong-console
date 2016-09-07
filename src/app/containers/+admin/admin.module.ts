import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Size } from '../../shared';
import { ROUTING } from './admin.routes';
import { DashboardContainer } from './dashboard';
import { AdminContainer } from './admin.container';
import { ComponentsModule } from '../../components';

@NgModule({
  imports: [ CommonModule, ROUTING, ComponentsModule ],
  declarations: [ DashboardContainer, AdminContainer, Size ]
})
export default class AdminModule {
  static routes = ROUTING;
  constructor()  {
    console.log('--ADMIN MODULE INITED--');
  }
}
