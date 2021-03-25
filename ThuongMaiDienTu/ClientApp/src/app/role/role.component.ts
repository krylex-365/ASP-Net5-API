import { Component } from '@angular/core';
import { Role } from '../../models/role.model';
import { RoleService } from '../../services/role.service';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss']
})
/** role component*/
export class RoleComponent {
  /** role ctor */
  roles: Role[];

  constructor(private roleSevice: RoleService) { }
  
  ngOnInit() {
    this.roleSevice.getRole().subscribe(result => {
      this.roles = result;
      console.log(this.roles);
    });
    console.log(this.roles);
  }
}
