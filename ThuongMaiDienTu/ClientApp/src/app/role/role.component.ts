import { Component, OnInit } from '@angular/core';
import { IRole } from '../../models/role.interface';
import { RoleService } from '../../services/role.service';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss']
})
/** role component*/
export class RoleComponent implements OnInit {
  /** role ctor */
  roles: Array<IRole>;

  constructor(private roleSevice: RoleService) { }
  
  ngOnInit() {
    this.roleSevice.getAll().subscribe(
      result => {
        this.roles = result;
        console.log(this.roles);
      });
    
  }
}
