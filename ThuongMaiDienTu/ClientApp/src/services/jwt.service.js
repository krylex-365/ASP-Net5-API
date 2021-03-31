/*import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtService implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    var token = localStorage.getItem('JWToken');
    console.log(token);
    console.log(this.router.navigate);
    console.log(this.jwtHelper.tokenGetter());
    return false;
  }
}*/
//# sourceMappingURL=jwt.service.js.map