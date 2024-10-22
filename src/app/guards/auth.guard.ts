import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthserviceService } from '../service/auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private jwtHelper = new JwtHelperService();

  constructor(
    private authService: AuthserviceService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const userRoles = this.authService.getUserRoles() || []; // Default to empty array if undefined
    const expectedRoles = route.data['expectedRoles'] as string[] || []; // Default to empty array if undefined

    console.log('AuthGuard: isAuthenticated:', isAuthenticated);
    console.log('AuthGuard: userRoles:', userRoles);
    console.log('AuthGuard: expectedRoles:', expectedRoles);

    if (isAuthenticated && this.hasRole(userRoles, expectedRoles)) {
      return true;
    }

    // Redirect to login if not authorized
    this.router.navigate(['/login']);
    return false;
  }

  private hasRole(userRoles: string[], expectedRoles: string[]): boolean {
    return expectedRoles.some(role => userRoles.includes(role));
  }
}
