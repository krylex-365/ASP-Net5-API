import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../models/account';
import { Dashboard } from '../../models/Dashboard';
import { LoginService } from '../../services/login.service';
import { ReloadService } from '../../services/reload.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
/** login component*/
export class LoginComponent {
  /** login ctor */
  account: Account;
  login: boolean;
  errorMsg = '';
  dashboard: DashboardComponent;

  //error
  loginError;

  constructor(private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private reload: ReloadService  ) { }

  ngOnInit() {
  }

  onSubmit(account: Account){
    this.account = account;
    this.login = false;

    this.loginService.login(this.account).subscribe(
      () => {
        console.log(this.loginService.getuser())
        if (this.loginService.getuser()) {
          if (this.loginService.getuser().RoleId == 1) {
            this.redirectAdmin();
          } else {
            this.loginError = "You don't have permission to login!";
          }
        } else {
          this.loginError = "Username or password not correct!";
        }
      }
    )
      /*.subscribe(
        result => {
          if (result == 200) {
            this.redirect(true);
          }
        });*/
  }

  redirectAdmin() {
    this.reload.reload = "1";
    this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'admin/dashboard');
  }

  redirectUser() {
    this.reload.reload = "1";
    this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'admin/account');
  }

  refresh(): void {
    window.location.reload();
  }
}
