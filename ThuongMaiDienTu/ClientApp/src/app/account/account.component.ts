import { Component, OnInit } from '@angular/core';
import { IAccount } from '../../models/account.interface';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
/** account component*/
export class AccountComponent implements OnInit {
  /** account ctor */
  accounts: Array<IAccount>;
  constructor(private accountService: AccountService) { }
    ngOnInit(): void {
      this.accountService.getAll().subscribe(result => {
        this.accounts = result;
      })
    }

}
