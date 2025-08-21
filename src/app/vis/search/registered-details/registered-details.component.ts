import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registered-details',
  templateUrl: './registered-details.component.html',
  styleUrls: ['./registered-details.component.scss'],
})
export class RegisteredDetailsComponent implements OnInit {
  /**
   * @description Store treatment data
   */
  //treatmentData: any;
  showDetails = false;
  hideOthers = false;

  /**
   * @description get registered details
   */
  @Input() registeredDetails: any;
  @Input() caseDetails: any;
  @Input() medicineDetails: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.viewDetailsResponse = JSON.parse(localStorage.getItem('viewDetailsResponse'));
    // this.onlyClinicalDetail = this.viewDetailsResponse.clinical;
    // this.caseDetailsResponse = JSON.parse(localStorage.getItem('caseDetailsResponse'));
    // console.log('this.viewDetailsResponse', this.viewDetailsResponse);
  }

  treatmentDetails() {
    this.showDetails = true;
    this.hideOthers = true;
  }
  clinical() {}
}
