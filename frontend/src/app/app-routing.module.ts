import { Routes } from '@angular/router';
import { AvailabilityComponent } from './availability/availability.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LeaveComponent } from './leave/leave.component';
import { ManagerComponent } from './manager/manager.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'availability', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'availability',
    component: AvailabilityComponent,
    canActivate: [authGuard]
  },
  {
    path: 'leave',
    component: LeaveComponent,
    canActivate: [authGuard]
  },
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard]
  }
];
