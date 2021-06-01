import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentAuthGuard implements CanActivate {
  
  private userType: string = "student";

  constructor (private authService: AuthService, private router: Router) {}

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
    return this.authService.isAuthenticated(this.userType)
        .pipe(
          map((response: {authenticated: boolean}) => {
            if (response.authenticated) {
              return true;
            }
            this.router.navigate(['']);
            return false;
          }), 
          catchError((error: any) => {
            this.router.navigate(['/error']);
            return of(false);
          }));
  }
  
}
