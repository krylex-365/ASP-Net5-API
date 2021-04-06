import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private loginService: LoginService,
    private router: Router ) { }

  ngOnInit() {
  }

  onSubmit(account: Account){
    this.account = account;
    this.login = false;
    this.loginService.login(this.account)
      .subscribe(result => {
        console.log(result);
        if (result.status == 200) {
          console.log(result.status);
          this.login = true;
          console.log(this.login);
        }
      });
    if (this.login) {
      this.router.navigateByUrl('/Dashboard');
    } else {
      console.log(this.login);
    }
  }
}
