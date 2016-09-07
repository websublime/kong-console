import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Size, ShareModule } from '../../shared';
import { ROUTING } from './admin.routes';
import { DashboardContainer } from './dashboard';
import { AdminContainer } from './admin.container';
import { ComponentsModule } from '../../components';
import { ConsumersContainer } from './consumers';
import { ApisContainer, NewApiContainer, EditApiContainer } from './apis';

@NgModule({
  imports: [ ShareModule, ROUTING, ComponentsModule ],
  declarations: [
    DashboardContainer, AdminContainer, Size,
    ApisContainer, NewApiContainer, EditApiContainer,
    ConsumersContainer
  ]
})
export default class AdminModule {
  static routes = ROUTING;
  constructor()  {
    console.log('--ADMIN MODULE INITED--');
  }
}
