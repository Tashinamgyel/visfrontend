import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-treatment-details',
  templateUrl: './treatment-detail.component.html',
  styleUrls: ['./treatment-detail.component.scss'],
})
export class TreatmentDetailComponent implements OnInit {
  treatmentForm: FormGroup;
  massRegistrationId: string;

  @Input() dogRegistrationDetails: any;
  treatmentDetail: any;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.dogRegistrationDetails);
    this.initializeForm();
  }

  initializeForm() {
    this.treatmentForm = this.fb.group({
      treatment: new FormControl('', Validators.required),
    });
  }
  changeTreatmentDerail(event: MatRadioChange) {
    if (event.value === 'Poultry') {
      this.treatmentDetail = 'Poultry';
    } else if (event.value === 'Deworming') {
      this.treatmentDetail = 'Deworming';
    } else if (event.value === 'Vaccination') {
      this.treatmentDetail = 'Vaccination';
    }
  }
}
