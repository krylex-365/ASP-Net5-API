import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Account } from '../../models/account';
import { AccountService } from '../../services/account.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { ReloadService } from '../../services/reload.service';
import { Page404Service } from '../../services/page404.service';

@Component({
    selector: 'app-user-account',
    templateUrl: './user-account.component.html',
    styleUrls: ['./user-account.component.css']
})
/** user component*/
export class UserAccountComponent implements OnInit{
  /** user ctor */
  customers: Array<Customer>;
  accounts: Array<Account>;
  roles: Array<Role>
  userName: string;
  roleName: string;
  customer: Customer;
  account: Account;
  deleteId: string;
  deleteName: string;

  constructor(private customerService: CustomerService,
    private accountService: AccountService,
    private roleService: RoleService,
    private page404: Page404Service,
    private reload: ReloadService) {

  }

  async ngOnInit() {
    this.page404.go();

    await this.accountService.getAccounts().subscribe(
      result => {
        this.accounts = result;
        console.log(this.accounts);
      });
    await this.roleService.getAll().subscribe(
      result => {
        this.roles = result;
        console.log(this.roles);
      }
    )
    this.customerService.getCustomers().subscribe(
      result => {
        this.customers = result;
        console.log(this.customers);
      });
    this.reload.refresh();
  }

  getUserName(id: string) {
    this.accounts.forEach(acc => {
      if (acc.accountId == id) {
        this.userName = acc.userName;
      }
    })
  }

  getRoleName(id: string) {
    this.roles.forEach(rol => {
      if (rol.roleId == id) {
        this.roleName = rol.name;
      }
    })
  }

  detail(id: string) {
    this.accounts.forEach(acc => {
      if (acc.accountId == id) {
        this.account = acc;
      }
    })
    this.customers.forEach(cus => {
      if (cus.customerId == id) {
        this.customer = cus;
      }
    })
  }

  setDeleteId(id: string, name: string) {
    this.deleteId = id;
    this.deleteName = name;
  }

  setNoDel() {
    this.deleteId = null;
    this.deleteName = null;
  }

  async delete() {
    await this.customerService.delete(this.deleteId).subscribe(
      result => {
        console.log(result);
        if (result.status == 200) {
          this.refresh();
        }
      });
  }

  refresh(): void {
    window.location.reload();
  }
}
