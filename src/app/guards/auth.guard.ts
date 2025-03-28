import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TsService } from '../services/ts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private tsService: TsService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.tsService.getUser();

    if (Object.keys(user).length > 0) {
      if (route.data['roles'] && route.data['roles'].indexOf(user.roles[0]) === -1) {
        alert("Tu rol " + user.roles[0] + " , no tienes permiso para acceder a esta página");
        this.tsService.signOut()
        return false;
      }

      return true;
    }

    this.tsService.signOut()
    return false;
  }

}
