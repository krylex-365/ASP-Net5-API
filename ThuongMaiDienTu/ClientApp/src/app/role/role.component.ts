import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss']
})
/** role component*/
export class RoleComponent implements OnInit {
  /** role ctor */
  roles: Array<Role>;

  constructor(private roleSevice: RoleService) { }
  
  ngOnInit() {
    this.roleSevice.getAll().subscribe(
      result => {
        this.roles = result;
        console.log(this.roles);
      });
  }

  onSubmit(role: Role) {
    this.roleSevice.add(role).subscribe(
      result => console.log(result),
      error => console.log(error)
    )
  }

  deleteItem(id: string) {
    this.roleSevice.delete(id).subscribe(
      result => console.log(result),
      error => console.log(error)
    )
  }
}
