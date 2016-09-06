import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from '../../shared';
import { DashboardContainer } from './dashboard';

const ROUTES: Routes = [
  // { path: 'admin', component: DashboardContainer }
  { path: '', component: DashboardContainer, pathMatch: 'full', canActivate: [GuardService] }
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
