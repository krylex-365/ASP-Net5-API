import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../../models/account';
import { LoginService } from '../../../services/login.service';
import { ReloadService } from '../../../services/reload.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
/** login component*/
export class LoginTruemartComponent {
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
    private reload: ReloadService ) { }
  ngOnInit() { }

  onSubmit(account: Account) {
    this.account = account;
    this.login = false;

    this.loginService.login(this.account).subscribe(
      () => {
        console.log(this.loginService.getuser())
        if (this.loginService.getuser() && this.loginService.getuser().UserName != "") {
          this.redirectShop();
        } else {
          this.loginError = "Username or password not correct!";
        }
      }
    )
  }

  redirectShop() {
    this.reload.reload = "1";
    this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'shop');
  }

  refresh(): void {
    window.location.reload();
  }
}
