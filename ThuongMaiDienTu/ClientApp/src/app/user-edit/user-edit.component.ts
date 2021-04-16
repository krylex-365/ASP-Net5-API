import { Component } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Account } from '../../models/account';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
/** user-edit component*/
export class UserEditComponent {
    /** user-edit ctor */
    constructor() {

    }
}
