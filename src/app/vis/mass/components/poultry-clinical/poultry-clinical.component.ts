import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-poultry-clinical',
  templateUrl: './poultry-clinical.component.html',
  styleUrls: ['./poultry-clinical.component.scss'],
})
export class PoultryClinicalComponent implements OnInit {
  @Input() treatmentType: string;
  @Input() registrationDetails: any;
  @Input() showPoultryClinical: boolean;
  @Input() checked: boolean;

  treatment: string;
  constructor() {}

  ngOnInit(): void {}
}
