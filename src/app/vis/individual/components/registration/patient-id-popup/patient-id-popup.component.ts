import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-id-popup',
  templateUrl: './patient-id-popup.component.html',
  styleUrls: ['./patient-id-popup.component.scss'],
})
export class PatientIdPopupComponent implements OnInit {
  @Input() registrationDetails: any;
  // @Input() editable = false;
  patientId: string;

  constructor(public dialogRef: MatDialogRef<PatientIdPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log('data', this.data);
    this.patientId = this.data.registrationDetails.patientId;
  }
  onConfirm() {
    this.dialogRef.close(true);
  }
}
