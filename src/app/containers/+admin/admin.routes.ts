import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from '../../shared';
import { DashboardContainer } from './dashboard';
import { AdminContainer } from './admin.container';
import { ApisContainer, NewApiContainer, EditApiContainer } from './apis';

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
      }
    ]
  }
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
