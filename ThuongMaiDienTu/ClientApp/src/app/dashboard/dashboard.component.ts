import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../../models/Dashboard';
import { DashboardService } from '../../services/dashboard.service';
import { ReloadService } from '../../services/reload.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
/** dashboard component*/
export class DashboardComponent implements OnInit{
  /** dashboard ctor */
  dashboards: Array<Dashboard>;

  constructor(private dashboardService: DashboardService,
    private reload: ReloadService  ) { }

  ngOnInit() {
    this.dashboardService.getNewOrders().subscribe(
      result => {
        this.dashboards = result;
        console.log(this.dashboards);
      });
    this.reload.refresh();
  }
}
