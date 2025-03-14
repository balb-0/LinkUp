import { Routes } from '@angular/router';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { HistoryComponent } from './pages/history/history.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfessionalsComponent } from './pages/professionals/professionals.component';
import { StudentsComponent } from './pages/students/students.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';;


export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'professionals',
    component: ProfessionalsComponent
  },
  {
    path: 'students',
    component: StudentsComponent
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
