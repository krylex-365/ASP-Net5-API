import { Component } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Account } from '../../models/account';
import { UserAddService } from '../../services/user-add.service';

@Component({
    selector: 'app-user-add',
    templateUrl: './user-add.component.html',
    styleUrls: ['./user-add.component.scss']
})
/** user-add component*/
export class UserAddComponent {
    /** user-add ctor */
    constructor() {

    }
}
