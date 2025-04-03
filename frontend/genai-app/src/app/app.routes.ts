import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'summary',
    loadComponent: () =>
      import('./pages/summary/summary.component').then((m) => m.SummaryComponent),
    canActivate: [authGuard],
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./pages/reports/reports.component').then((m) => m.ReportsComponent),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
