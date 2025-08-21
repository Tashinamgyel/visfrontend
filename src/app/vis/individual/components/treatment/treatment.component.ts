import { Component, Input, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Clinical } from '@app/vis/shared/model/model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'treatment-registration',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.scss'],
})
export class TreatmentComponent implements OnInit {
  treatment: string;
  patientId: string;
  treatmentForm: FormGroup;

  clinical: Clinical;

  @Input() registrationDetails: any;
  @Input() editable = false;

  constructor() {}

  ngOnInit(): void {
    this.patientId = this.registrationDetails['patientId'];
  }

  changeTreatment(event: MatRadioChange) {
    this.treatment = event.value;
  }
}
