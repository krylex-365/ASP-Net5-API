import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ReloadService } from '../../services/reload.service';

@Component({
    selector: 'app-web-form',
    templateUrl: './web-form.component.html',
    styleUrls: ['./web-form.component.css']
})
/** web-form component*/
export class WebFormComponent {
    /** web-form ctor */
  constructor(private router: Router,
    private route: ActivatedRoute,
    private reload: ReloadService,
    private loginService: LoginService,) { }

  logout() {
    this.loginService.logout().subscribe(
      result => {
        console.log(result);
        if (result.status == 200) {
          this.redirectLogin();
        }
      });
  }

  redirectLogin() {
    this.reload.reload = "1";
    this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'admin/login');
  }
}
