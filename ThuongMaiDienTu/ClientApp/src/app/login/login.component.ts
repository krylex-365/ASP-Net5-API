import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../models/account';
import { Dashboard } from '../../models/Dashboard';
import { LoginService } from '../../services/login.service';
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

  constructor(private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute  ) { }

  ngOnInit() {
  }

  onSubmit(account: Account){
    this.account = account;
    this.login = false;

    this.loginService.login(this.account).subscribe(
      () => {
        console.log(this.loginService.getuser())
        if (this.loginService.getuser().UserName == "admin") {
          this.redirectAdmin();
        } else {
          this.redirectUser();
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
    this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'dashboard');
  }

  redirectUser() {
    this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'account');
  }

  refresh(): void {
    window.location.reload();
  }
      
}
