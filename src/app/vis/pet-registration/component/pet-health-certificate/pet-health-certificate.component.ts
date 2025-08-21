import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '@app/@core';
import { MasterService } from '@app/master-management/services/master.service';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { CredentialsService } from '@app/auth';
import { PetRegistration } from '@app/vis/shared/model/model';

@Component({
  selector: 'app-pet-health-certificate',
  templateUrl: './pet-health-certificate.component.html',
  styleUrls: ['./pet-health-certificate.component.scss'],
})
export class PetHealthCertificateComponent implements OnInit {
  actionType: string;
  petRegistrationNo: string;
  petRegistration: PetRegistration;
  petCertificate: FormGroup;

  personName: any;
  personCID: any;
  personAddress: any;
  animalType: any;
  breed: any;
  age: any;
  registrationNumber: any;
  petName: any;
  microChip: any;
  vaccineType: any;
  speciesName: string;
  clinicalDetails: any;
  vaccinationDate: any;
  treatmentDate: any;
  vaccinationDetails: any;
  clinicalDetailsAdvice: any;
  clinicalDetailsDate: any;

  constructor(
    public dialogRef: MatDialogRef<PetHealthCertificateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private masterService: MasterService,
    private visMasterService: SharedService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.actionType = this.data.actionType;
    this.petRegistrationNo = this.data.petRegistrationNo;
    this.initializeForm();
    this.populateForm();
  }
  initializeForm() {
    this.petCertificate = this.fb.group({
      ownerName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      locality: new FormControl('', Validators.required),
      speciesName: new FormControl('', Validators.required),
      Breed: new FormControl('', Validators.required),
      petName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      microchipNumber: new FormControl('', Validators.required),
      animalName: new FormControl('', Validators.required),
      petRegistrationNumber: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      vaccinationDate: new FormControl('', Validators.required),
      treatmentDate: new FormControl('', Validators.required),
      vaccineType: new FormControl('', Validators.required),
    });
  }

  populateForm() {
    {
      this.visMasterService.getPetRegistrationNumber(this.petRegistrationNo).subscribe(
        (response) => {
          this.petRegistration = response;

          this.personName = response.ownerName;
          this.personCID = response.mobileNumber;
          this.personAddress = response.locality;
          this.speciesName = response.speciesName;
          this.animalType = response.petName;
          this.breed = response.breed;
          this.age = response.year;
          this.registrationNumber = response.petRegistrationNumber;
          this.petName = response.petName;
          this.microChip = response.microchipNumber;
          // this.treatmentDate=response.treatmentDate;
          this.vaccineType = response.vaccineId;
          this.vaccinationDate = response.vaccinationDate;
          this.clinicalDetailsDate = response.clinicalDetails[0].treatmentDate;
          this.clinicalDetailsAdvice = response.clinicalDetails[0].advice;
          // this.vaccinationDetails = response.vaccinationDetails[0].treatmentDate;
          //this.vaccinationDetails = response.vaccinationDetails[0].vaccineType;
          // this.sterilizationDetails = response.sterilizationDetails[0].treatmentDate;
        },
        () => {
          this.notificationService.openErrorSnackBar('Could not load details, please try again later');
        }
      );
    }
  }

  printPage(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print').innerHTML;
    popupWin = window.open('', '_blank', 'top=20,left=0,height=100%,width=100%');
    popupWin.document.open();
    popupWin.document.write(`
    <html>
      <head>
        <style>
        footer {
                font-size: 12px;
                color: #f00;
                text-align: center;
                }

              @page {
              size: A4;
              margin: 21mm 27mm 27mm 27mm;
              }

            @media print {
            footer {
              position: fixed;
              font-size: 150px;
              bottom: 0;
            }

            .content-block, p {
              page-break-inside: avoid;
            }

            html, body {
              width: 250mm;
              height: 297mm;
            }
            }
        </style>
      </head>
      <body onload="window.print();window.close()">${printContents}</body>
    </html>`);
    popupWin.document.close();
  }
}
