import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-print-treatment-detail',
  templateUrl: './print-treatment-detail.component.html',
  styleUrls: ['./print-treatment-detail.component.scss'],
})
export class PrintTreatmentDetailComponent implements OnInit {
  @ViewChild('printsection', { static: false }) printsection: ElementRef;

  ownerDetails: any;

  animalDetails: any;
  medicationDetails: any;
  vaccinationDetails: any = [];

  nationalityChecking: any;

  constructor(
    public dialogRef: MatDialogRef<PrintTreatmentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public treatmentDetail: any
  ) {}

  ngOnInit(): void {
    console.log('treatmentDetail', this.treatmentDetail);
    console.log('massRegistrationFormData', JSON.parse(localStorage.getItem('massRegistrationFormData')));

    this.ownerDetails = JSON.parse(localStorage.getItem('massRegistrationFormData'));
    this.animalDetails = this.treatmentDetail.massTableData;
    console.log('animalDetails', this.ownerDetails);
    this.medicationDetails = this.treatmentDetail.massTableData;
    this.vaccinationDetails.push(this.treatmentDetail.massTableData);
    console.log('vaccinationDetails', this.vaccinationDetails);

    this.checkingNational();
  }

  checkingNational() {
    if (this.ownerDetails.nationality === 1) {
      this.nationalityChecking = 'Bhutanese';
    } else if (this.ownerDetails.nationality === 2) {
      this.nationalityChecking = 'Non-Bhutanese';
    }
  }
}
