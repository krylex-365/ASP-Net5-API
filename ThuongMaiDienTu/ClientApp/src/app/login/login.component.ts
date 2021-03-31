import { Component } from '@angular/core';
import { Account } from '../../models/account';
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
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  onSubmit(account: Account) {
    this.account = account;
    this.loginService.login(this.account);
  }
}
