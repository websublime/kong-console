import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from '../../shared';
import { DashboardContainer } from './dashboard';
import { AdminContainer } from './admin.container';

const ROUTES: Routes = [
  // { path: 'admin', component: DashboardContainer }
  {
    path: '',
    component: AdminContainer,
    pathMatch: 'full',
    canActivate: [ GuardService ],
    children: [
      { path: '', component: DashboardContainer }
    ]
  }
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
