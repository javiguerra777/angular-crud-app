import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export class Permissions{
  canActivate() {
    return localStorage.getItem('token') ? true : false 
  }
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageGuard implements CanActivate {
  constructor(private permissions: Permissions, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.permissions.canActivate()) {
      this.router.navigateByUrl('/');
    }
    return true;
  }

}
