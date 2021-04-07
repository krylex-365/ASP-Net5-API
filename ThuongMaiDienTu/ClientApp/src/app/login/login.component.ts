import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        () => { this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'dashboard') }
      )
  }
}
