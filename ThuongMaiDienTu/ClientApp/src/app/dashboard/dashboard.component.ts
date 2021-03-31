import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../../models/Dashboard';
import { DashboardService } from '../../services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
/** dashboard component*/
export class DashboardComponent implements OnInit{
  /** dashboard ctor */
  dashboards: Array<Dashboard>;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getNewOrders().subscribe(
      result => {
        this.dashboards = result;
        console.log(this.dashboards);
      });
  }
}
