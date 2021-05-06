import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ReloadService } from './reload.service';

@Injectable({
  providedIn: 'root',
})
export class Page404Service {

  user;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private reload: ReloadService  ) { }

  go() {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    if (currentUser == null) {
      this.redirect404();
    }

    this.user = jwt_decode(currentUser.token);

    if (this.user.UserName != "admin") {
      this.redirect404();
    }
  }

  redirect404() {
    this.reload.reload = "1";
    this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'role');
  }
}
