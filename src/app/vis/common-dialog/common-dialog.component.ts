import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class CommonDialogModel {
  [x: string]: any;
  constructor(public patientID: string, public petRegistrationNumber: string, public outbreakId: string) {}
}

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss'],
})
export class CommonDialogComponent implements OnInit {
  patientID: any;
  nullPatientId: boolean = false;

  massID: any;
  nullMassId: any = '';

  outbreakId: any;
  nullOutbreakId: boolean = false;

  petRegistrationNumber: any;
  nullpetRegistrationNumber: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CommonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommonDialogModel
  ) {}

  ngOnInit(): void {
    this.patientID = this.data.patientID;
    console.log('patient id ' + this.patientID);
    this.petRegistrationNumber = this.data.petRegistrationNumber;
    this.outbreakId = this.data.outbreakId;

    if (this.patientID != '') {
      this.nullPatientId = true;
    }
    if (this.petRegistrationNumber != '') {
      this.nullpetRegistrationNumber = true;
    }
    if (this.outbreakId != '') {
      this.nullOutbreakId = true;
    }
  }
  onConfirm() {
    this.dialogRef.close(true);
  }
}
