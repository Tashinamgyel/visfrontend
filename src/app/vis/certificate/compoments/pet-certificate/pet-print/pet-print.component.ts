import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { PetRegistration } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';

@Component({
  selector: 'app-pet-print',
  templateUrl: './pet-print.component.html',
  styleUrls: ['./pet-print.component.scss'],
})
export class PetPrintComponent implements OnInit {
  actionType: string;
  // petRegistrationNo: string;
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

  petRegistrationNo: any;

  dataToSend: any;

  constructor(
    // private visMasterService: SharedService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PetPrintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initializeForm();
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
    this.getPetRegistrationNumber();
  }

  getPetRegistrationNumber() {
    this.dataToSend = this.data;
    this.petRegistration = this.data;
    console.log('sdfsfsdfsd', this.data);

    this.personName = this.data.treatmentFormData.ownerName;
    this.personCID = this.data.treatmentFormData.mobileNumber;
    this.personAddress = this.data.treatmentFormData.locality;
    this.speciesName = this.data.treatmentFormData.speciesName;
    this.animalType = this.data.treatmentFormData.petName;
    this.breed = this.data.treatmentFormData.breed;
    this.age = this.data.treatmentFormData.year;
    this.registrationNumber = this.data.treatmentFormData.petRegistrationNumber;
    this.petName = this.data.treatmentFormData.petName;
    this.microChip = this.data.treatmentFormData.microchipNumber;
    // this.treatmentDate=response.treatmentDate;
    this.vaccineType = this.data.treatmentFormData.vaccineId;
    this.vaccinationDate = this.data.treatmentFormData.vaccinationDate;
    this.clinicalDetailsDate = this.data.treatmentFormData.clinicalDetails[0].treatmentDate;
    this.clinicalDetailsAdvice = this.data.treatmentFormData.clinicalDetails[0].advice;
    // this.vaccinationDetails = response.vaccinationDetails[0].treatmentDate;
    //this.vaccinationDetails = response.vaccinationDetails[0].vaccineType;
    // this.sterilizationDetails = response.sterilizationDetails[0].treatmentDate;
  }

  printPage() {
    window.print();
  }
}
