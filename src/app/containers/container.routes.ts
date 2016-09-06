import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeContainer } from './home';
import { LoginContainer } from './login';

const ROUTES: Routes = [
  { path: '', component: HomeContainer },
  { path: 'login', component: LoginContainer },
  { path: 'admin', loadChildren: () => System.import('./+admin/admin.module') }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES, { useHash: false });
