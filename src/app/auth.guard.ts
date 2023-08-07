import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.username) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
