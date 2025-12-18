import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data['roles'] as string[];

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.auth.getRole();
    if (allowedRoles.includes(userRole!)) {
      return true;
    }

    // Redirect based on role
    if (userRole === 'ADMIN') this.router.navigate(['/admin']);
    else if (userRole === 'MANAGER') this.router.navigate(['/manager']);
    else this.router.navigate(['/availability']);

    return false;
  }
}
