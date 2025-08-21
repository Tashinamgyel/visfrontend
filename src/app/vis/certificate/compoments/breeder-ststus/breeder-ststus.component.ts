import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@app/@core';
import { PetRegistration } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';

@Component({
  selector: 'app-breeder-ststus',
  templateUrl: './breeder-ststus.component.html',
  styleUrls: ['./breeder-ststus.component.scss'],
})
export class BreederStstusComponent implements OnInit {
  @ViewChild('printsection', { static: false }) printsection: ElementRef;
  actionType: string;
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
  printableArea: any;
  printTitle: string;
  breedS: any;
  registrationNumbers: any;
  petNames: any;
  speciesNames: string;
  ownerShipType: any;
  microchipNumbers: any;
  countryId: any;
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
  nationality: string;
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

  constructor(
    private visMasterService: SharedService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    public dialog: MatDialog
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
      dewormingDate: new FormControl(''),
      emailId: new FormControl(''),
      ownerType: new FormControl(''),
      dateOfRegistration: new FormControl(''),
      nationality: new FormControl(''),
      dzongkhagId: new FormControl(''),
      gewogId: new FormControl(''),
      gewogName: new FormControl(''),
      villageId: new FormControl(''),
      cid: new FormControl(''),
      registrationDate: new FormControl(''),
      speciesId: new FormControl(''),
      colour: new FormControl(''),
      distinguishingMark: new FormControl(''),
      petRegistrationNo: new FormControl(''),
      sex: new FormControl(''),
      dateRenewal: new FormControl(''),
      receiptNumber: new FormControl(''),
      day: new FormControl(''),
      month: new FormControl(''),
      petBreedId: new FormControl(''),
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

  getPetRegistrationNumber() {
    this.visMasterService.getPetRegistrationNumber(this.petRegistrationNo).subscribe(
      (response) => {
        this.dataToSend = response;
        this.petRegistration = response;
        // console.log(response, 'sdfsfsdfsd');

        this.petRegistrationNumber = response.petRegistrationNumber;
        this.ownerType = response.ownerType;
        this.registrationDate = response.registrationDate;
        this.cid = response.cid;
        this.nationality = response.nationality == 1 ? 'Bhutanese' : 'Non-Bhutaneese';
        this.locality = response.locality;
        this.mobileNumber = response.mobileNumber;
        this.emailId = response.emailId;
        this.gewogName = response.gewogName;
        this.dzongkhagName = response.dzongkhagName;
        this.villageName = response.villageName;
        this.petName = response.petName;
        this.microchipNumber = response.microchipNumber;
        this.speciesName = response.speciesName;
        this.countryId = response.countryName;
        this.passportNumber = response.passportNumber;
        this.breed = response.breed;
        this.breederStatus = response.breederStatus;
        this.distinguishingMark = response.distinguishingMark;
        this.sex = response.sex == 'F' ? 'Female' : 'Male';
        this.neuterStatus = response.neuterStatus;
        this.ownerName = response.ownerName;
        this.status = response.status;
        this.dateRenewal = response.dateRenewal;
        this.receiptNumber = response.receiptNumber;
        this.year = response.year;
        this.month = response.month;
        this.day = response.day;
        this.colour = response.distinguishingMark;
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

  // printPage(){
  //  window.print();
  //   // const dialogRef = this.dialog.open(PetPrintComponent, {
  //   //   width: '100%',
  //   //   maxHeight: '90vh',
  //   //   data: {
  //   //     treatmentFormData: this.dataToSend
  //   //   }
  //   // });

  //   // var printContents = document.getElementById("printableArea").innerHTML;
  //   // //console.log('printContents', printContents);
  //   //  var originalContents = document.body.innerHTML;

  //   //  document.body.innerHTML = printContents;

  //   //  window.print();

  //   //  document.body.innerHTML = originalContents;

  // }
}
