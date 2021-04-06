import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { environment } from '../../environments/environment.prod';
import { Account } from '../../models/account';
import { Login } from '../../models/login';
import { LoginService } from '../../services/login.service';

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

  constructor(private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute  ) { }

  ngOnInit() {
  }

  onSubmit(account: Account){
    this.account = account;
    this.login = false;
    
    this.loginService.login(this.account)
      .subscribe(
        (result) => {
          if (result.status == 200) {
            this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'dashboard');
          } else {
            console.log(false);
          }
        },
        error => console.log(false)
      );
  }
}
