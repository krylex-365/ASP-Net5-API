import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
/** account component*/
export default class AccountComponent implements OnInit {
  /** account ctor */
  accounts: Array<Account>;
  constructor(private accountService: AccountService) { }
    ngOnInit(): void {
      this.accountService.getAll().subscribe(result => {
        this.accounts = result;
      })
    }

}
