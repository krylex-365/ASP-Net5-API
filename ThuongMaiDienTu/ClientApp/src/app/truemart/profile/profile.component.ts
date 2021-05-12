import { Component } from '@angular/core';
declare var $: any;
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
/** profile component*/
export class ProfileComponent {
    /** profile ctor */
  constructor() { }
  ngOnInit() {
    $(document).ready(function () {
        $("#datepickerBirthday").datepicker();
    });
  }
}
