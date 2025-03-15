import { Routes } from '@angular/router';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { HistoryComponent } from './pages/history/history.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfessionalsComponent } from './pages/professionals/professionals.component';
import { StudentsComponent } from './pages/students/students.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'professionals',
    component: ProfessionalsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }
];
