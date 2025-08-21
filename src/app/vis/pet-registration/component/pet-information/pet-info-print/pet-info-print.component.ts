import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { Country, PetRegistration } from '@app/vis/shared/model/model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-pet-info-print',
  templateUrl: './pet-info-print.component.html',
  styleUrls: ['./pet-info-print.component.scss'],
})
export class PetInfoPrintComponent implements OnInit {
  petCertificateForm: FormGroup;
  countrys: Country[];
  personName: any;
  personCID: any;
  personAddress: any;
  animalType: any;
  breedS: any;
  age: any;
  registrationNumbers: any;
  petNames: any;
  microChip: any;
  vaccineType: any;
  speciesNames: string;
  ownerShipType: any;
  clinicalDetails: any;
  vaccinationDate: any;
  treatmentDate: any;
  microchipNumbers: any;
  notificationService: any;
  petRegistration: PetRegistration;
  clinicalDetailsDate: any;
  countryId: any;
  dewormingDetails: any;
  vaccDetails: any;
  treatment_date: Date;
  vaccine_name: string;
  dewormngDetailsForPrinting: any;
  petRegistrationNumber: any;
  registrationNumber: any;
  ownerType: string;
  registrationDate: Date;
  dzongkhagName: string;
  gewogName: string;
  villageName: string;
  locality: string;
  ownerName: string;
  cid: number;
  emailId: string;
  mobileNumber: number;
  nationality: string;
  petName: string;
  microchipNumber: string;
  speciesName: string;
  breed: String;
  colour: String;
  distinguishingMark: string;
  passportNumber: string;
  sex: string;
  neuterStatus: string;
  breederStatus: string;
  status: string;
  dateRenewal: Date;
  receiptNumber: string;
  year: number;
  month: number;
  day: number;

  constructor(
    private visMasterService: SharedService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PetInfoPrintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  petInformation: any;

  ngOnInit(): void {
    this.petInformation = this.data.petInformation.petRegistrationNo;
    this.vaccDetails = this.data.vaccDetails;
    this.dewormngDetailsForPrinting = this.data.dewormngDetailsForPrinting;
    this.initializeForm();
    this.populateForm();
    //console.log('zzzzzzzzzzzzzzzzzzzzzzz', this.dewormngDetailsForPrinting);
  }

  initializeForm() {
    this.petCertificateForm = this.fb.group({
      petRegistrationNumber: new FormControl(''),
      emailId: new FormControl(''),
      ownerType: new FormControl(''),
      dateOfRegistration: new FormControl(''),
      nationality: new FormControl(''),
      ownerName: new FormControl(''),
      dzongkhagId: new FormControl(''),
      gewogId: new FormControl(''),
      gewogName: new FormControl(''),
      villageId: new FormControl(''),
      locality: new FormControl(''),
      mobileNumber: new FormControl(''),
      cid: new FormControl(''),
      petName: new FormControl(''),
      microchipNumber: new FormControl(''),
      registrationDate: new FormControl(''),
      speciesId: new FormControl(''),
      speciesName: new FormControl(''),
      colour: new FormControl(''),
      distinguishingMark: new FormControl(''),
      petRegistrationNo: new FormControl(''),
      sex: new FormControl(''),
      dateRenewal: new FormControl(''),
      receiptNumber: new FormControl(''),
      day: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
      petBreedId: new FormControl(''),
      treatmentDate: new FormControl(''),
      advice: new FormControl(''),
      vaccinationStatus: new FormControl(''),
      countryId: new FormControl(''),
      status: new FormControl(''),
      breederStatus: new FormControl(''),
      breed: new FormControl(''),
      petRegistrationNoOrMicrochip: new FormControl(''),
      neuterStatus: new FormControl(''),
      passportNumber: new FormControl(''),
    });
  }

  populateForm() {
    {
      this.visMasterService.getPetRegistrationNumber(this.petInformation).subscribe((response) => {
        this.petRegistration = response;
        this.visMasterService.loadCountry().subscribe((response) => {
          this.countrys = response;
        });
        //console.log(response, 'okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
        (this.petRegistrationNumber = this.petRegistration.petRegistrationNumber),
          (this.ownerType = this.petRegistration.ownerType),
          (this.registrationDate = this.petRegistration.registrationDate),
          (this.cid = this.petRegistration.cid),
          (this.nationality = this.petRegistration.nationality == 1 ? 'Bhutanese' : 'Non-Bhutaneese'),
          (this.locality = this.petRegistration.locality),
          (this.mobileNumber = this.petRegistration.mobileNumber),
          (this.emailId = this.petRegistration.emailId),
          (this.gewogName = this.petRegistration.gewogName),
          (this.dzongkhagName = this.petRegistration.dzongkhagName),
          (this.villageName = this.petRegistration.villageName),
          (this.petName = this.petRegistration.petName),
          (this.microchipNumber = this.petRegistration.microchipNumber),
          (this.speciesName = this.petRegistration.speciesName),
          (this.countryId = this.petRegistration.countryName),
          (this.passportNumber = this.petRegistration.passportNumber),
          (this.breed = this.petRegistration.breed),
          (this.distinguishingMark = this.petRegistration.distinguishingMark),
          (this.sex = this.petRegistration.sex == 'F' ? 'Female' : 'Male'),
          (this.neuterStatus = this.petRegistration.neuterStatus),
          (this.ownerName = this.petRegistration.ownerName),
          (this.status = this.petRegistration.status),
          (this.dateRenewal = this.petRegistration.dateRenewal),
          (this.receiptNumber = this.petRegistration.receiptNumber),
          (this.year = this.petRegistration.year),
          (this.month = this.petRegistration.month),
          (this.day = this.petRegistration.day),
          (this.colour = this.petRegistration.distinguishingMark);
        this.vaccineType = response.vaccineId;
        this.vaccinationDate = response.vaccinationDate;
        this.clinicalDetailsDate = response.clinicalDetails[0].treatmentDate;
        this.clinicalDetailsDate = response.clinicalDetails[0].advice;
        this.dewormingDetails = response.dewormingDetails[0].treatmentDate;
        //   this.getVaccinatationDetails = response.vaccinationDetails
        //  (this.getVaccinatationDetails(this.petRegistration.petRegistrationNumber, this.petRegistration.microchipNumber));
      });
    }
  }

  getVaccinatationDetails(petRegistrationNo: string, microchipNumber: string) {
    this.visMasterService.getVaccinatationDetails(petRegistrationNo, microchipNumber).subscribe((res) => {
      this.vaccDetails = res;
      console.log(this.vaccDetails, 'oooooookkkkkkkk');
    });
  }
}
