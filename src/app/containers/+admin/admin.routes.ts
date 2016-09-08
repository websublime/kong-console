import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from '../../shared';
import { DashboardContainer } from './dashboard';
import { AdminContainer } from './admin.container';
import { PluginsContainer } from './plugins';
import { ApisContainer, NewApiContainer, EditApiContainer } from './apis';
import { ConsumersContainer, NewConsumerContainer, EditConsumerContainer } from './consumers';

const ROUTES: Routes = [
  {
    path: '',
    component: AdminContainer,
    canActivate: [ GuardService ],
    children: [
      { path: '', component: DashboardContainer },
      {
        path: 'apis',
        pathMatch: '',
        children: [
          { path: '', component: ApisContainer },
          { path: 'new', component: NewApiContainer },
          { path: 'edit/:id', component: EditApiContainer }
        ]
      },
      {
        path: 'consumers',
        pathMatch: '',
        children: [
          { path: '', component: ConsumersContainer },
          { path: 'new', component: NewConsumerContainer },
          { path: 'edit/:id', component: EditConsumerContainer }
        ]
      },
      {
        path: 'plugins',
        pathMatch: '',
        children: [
          { path: '', component: PluginsContainer }
        ]
      }
    ]
  }
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
