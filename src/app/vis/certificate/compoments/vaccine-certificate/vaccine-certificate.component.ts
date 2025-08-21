import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { PetRegistration } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-vaccine-certificate',
  templateUrl: './vaccine-certificate.component.html',
  styleUrls: ['./vaccine-certificate.component.scss'],
})
export class VaccineCertificateComponent implements OnInit {
  @ViewChild('printsection', { static: false }) printsection: ElementRef;
  actionType: string;
  registrationDetails: FormGroup;
  animalName: any;
  animalType: any;
  personName: any;
  personCID: any;
  personAddress: any;
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
  printableArea: any;
  printTitle: string;
  breedS: any;
  registrationNumbers: any;
  petNames: any;
  speciesNames: string;
  ownerShipType: any;
  microchipNumbers: any;
  countryName: any;
  dewormingDetails: any;
  vaccDetails: any;
  treatment_date: Date;
  vaccine_name: string;
  dewormngDetailsForPrinting: any;
  petRegistrationNumber: any;
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
  microchipNumber: string;
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
  petInformation: any;
  dewormingDate: Date;
  dewormingDetailsDate: any;
  nationality: string;
  cidNumber: any;
  registeredDetails: any;
  patientId: any;
  breedName: any;
  localPlace: any;
  sexFull: any;
  dataSourceForVaccination: any;
  vaccineName: any;
  source: any[];
  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private visMasterService: SharedService,
    private notificationService: NotificationService,
    private service: MasterService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    // this.actionType = this.data.actionType;
    // this.patientId = this.data.patientId;this\

    this.petRegistrationNumber = this.registeredDetails;
  }

  initializeForm() {
    this.registrationDetails = this.fb.group({
      registrationNo: new FormControl(''),
      personName: new FormControl(''),
      personCID: new FormControl(''),
      personAddress: new FormControl(''),
      animalType: new FormControl(''),
      breed: new FormControl(''),
      age: new FormControl(''),
      registrationNumber: new FormControl(''),
      petName: new FormControl(''),
      microChip: new FormControl(''),
      vaccineType: new FormControl(''),
      speciesName: new FormControl(''),
      clinicalDetails: new FormControl(''),
      vaccinationDate: new FormControl(''),
      vaccinationDetails: new FormControl(''),
      clinicalDetailsAdvice: new FormControl(''),
      clinicalDetailsDate: new FormControl(''),
      petRegistrationNo: new FormControl(''),
      dataToSend: new FormControl(''),
      printableArea: new FormControl(''),
      printTitle: new FormControl(''),
      breedS: new FormControl(''),
      registrationNumbers: new FormControl(''),
      petNames: new FormControl(''),
      animalName: new FormControl(''),
      speciesNames: new FormControl(''),
      ownerShipType: new FormControl(''),
      microchipNumbers: new FormControl(''),
      countryName: new FormControl(''),
      dewormingDetails: new FormControl(''),
      vaccDetails: new FormControl(''),
      treatmentDate: new FormControl(''),
      vaccine_name: new FormControl(''),
      petRegistrationNumber: new FormControl(''),
      ownerType: new FormControl(''),
      registrationDate: new FormControl(''),
      dzongkhagName: new FormControl(''),
      gewogName: new FormControl(''),
      villageName: new FormControl(''),
      locality: new FormControl(''),
      ownerName: new FormControl(''),
      cid: new FormControl(''),
      emailId: new FormControl(''),
      mobileNumber: new FormControl(''),
      microchipNumber: new FormControl(''),
      distinguishingMark: new FormControl(''),
      passportNumber: new FormControl(''),
      sex: new FormControl(''),
      neuterStatus: new FormControl(''),
      breederStatus: new FormControl(''),
      status: new FormControl(''),
      dateRenewal: new FormControl(''),
      year: new FormControl(''),
      month: new FormControl(''),
      day: new FormControl(''),
      petInformation: new FormControl(''),
      dewormingDate: new FormControl(''),
      dewormingDetailsDate: new FormControl(''),
      cidNumber: new FormControl(''),
      registeredDetails: new FormControl(''),
      patientId: new FormControl(''),
      breedName: new FormControl(''),
      dataSourceForVaccination: new FormControl(''),
      vaccineName: new FormControl(''),
    });
  }

  vacineDetails: any[] = [];
  getRegistrationNumber() {
    var patientId = this.registrationDetails.value.registrationNo;
    this.service.getPatientDetails(patientId).subscribe((response) => {
      this.registeredDetails = response;
      this.localPlace = this.registeredDetails.locality;
      if (this.registeredDetails.sex === 'F') {
        this.sex = 'Female';
      } else {
        this.sex = 'Male';
      }
      if (this.registeredDetails.cidNumber === null || this.registeredDetails.cidNumber === 0) {
        this.nationality = 'Non-Bhutanese';
        this.countryName = this.registeredDetails.country.countryName;
      } else {
        this.nationality = 'Bhutanese';
      }
      if (this.registeredDetails.cidNumber === null || this.registeredDetails.cidNumber === 0) {
        this.passportNumber = this.registeredDetails.passportNumber;
        this.cidNumber = 'NA';
      } else {
        this.cidNumber = this.registeredDetails.cidNumber;
        this.passportNumber = 'Na';
      }
      this.dzongkhagName = this.registeredDetails.dzongkhag.dzongkhagName;
      this.gewogName = this.registeredDetails.gewog.gewogName;
      this.villageName = this.registeredDetails.village.villageName;
      this.petRegistrationNumber = this.registeredDetails.petRegistrationNumber;
      this.patientId = this.registeredDetails.patientId;
      this.animalName = this.registeredDetails.animalName;
      this.speciesName = this.registeredDetails.species.speciesName;
      this.animalType = this.registeredDetails.animalType.animalType;
      this.ownerName = this.registeredDetails.ownerName;
      this.breed = this.registeredDetails.breed.breedName;
      this.petRegistrationNumber = this.registeredDetails.petRegistrationNumber;
      this.year = this.registeredDetails.year;
      this.month = this.registeredDetails.month;
      this.day = this.registeredDetails.day;
      this.vacineDetails = this.registeredDetails.vaccination;
      this.dataSourceForVaccination.data = this.registeredDetails.vaccination;
    });
  }
}
