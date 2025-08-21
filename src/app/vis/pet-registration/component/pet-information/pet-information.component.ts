import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  AnimalTypes,
  ClinicalDetails,
  Dzongkhags,
  Gewogs,
  OwnershipTypes,
  PetBreeds,
  Species,
  Villages,
} from '@app/master-management/models/master';
import { Country, PetRegistration } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { PetHealthCertificateComponent } from '../pet-health-certificate/pet-health-certificate.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { NotificationService } from '@app/@core/notification.service';
import { PetInfoPrintComponent } from './pet-info-print/pet-info-print.component';
import { RegisterOwnerComponent } from '../register-owner/register-owner.component';

@Component({
  selector: 'app-pet-information',
  templateUrl: './pet-information.component.html',
  styleUrls: ['./pet-information.component.scss'],
})
export class PetInformationComponent implements OnInit {
  locality: any;
  [x: string]: any;
  showingImage: any;
  showingBarCode: any;
  clinicalDetails: Observable<ClinicalDetails[]>;
  public refreshData$ = new BehaviorSubject<boolean>(false);
  step = 0;
  public basicPanelOpenState: any;
  petInforForm: FormGroup;
  ownershipTypes: OwnershipTypes[];
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  species: Species[];
  petBreeds: PetBreeds[];
  countrys: Country[];
  petRegistration: PetRegistration;
  DontShowBarCodeImage: boolean = false;
  neuterStatusFlag: boolean;
  villages: Villages[];
  imageShow: boolean = false;
  nationality: boolean;
  vaccDetails: any;
  countryName: any;
  // @ViewChild('pdfViewer') pdfViewer: ElementRef;

  displayedColumns: string[] = ['slno', 'petRegistrationNumber', 'treatmentDate'];
  dataSource = new MatTableDataSource();

  displayedColumns1: string[] = ['slno', 'observation', 'treatmentDate'];
  dataSource1 = new MatTableDataSource();

  displayedColumns2: string[] = ['slno', 'treatmentDate'];
  dataSource2 = new MatTableDataSource();

  // displayedColumns3: string[] = ['slno', 'vaccineType', 'treatmentDate'];
  // dataSource3 = new MatTableDataSource();

  displayedColumns3: string[] = ['slno', 'vaccine_name', 'treatment_date'];
  dataSource3 = new MatTableDataSource();

  displayedColumns4: string[] = ['slno', 'abandonedDate', 'petRegistrationNo'];
  dataSource4 = new MatTableDataSource();

  displayedColumns5: string[] = [
    'slno',
    'transferDate',
    'cidNumber',
    'ownerName',
    'dzongkhagName',
    'gewogName',
    'village_name',
    'mobileNumber',
    'owner_type',
    'emailId',
    'locality',
  ];
  dataSource5 = new MatTableDataSource();

  dewormingDataForSending: any;
  vaccinationDataForSending: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private visMasterService: SharedService,
    private service: SharedService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.clinicalDetails = this.refreshData$.pipe(switchMapap((_) => this.visMasterService.populateClincalDetail()));
    this.initializeForm();
    this.populateForm();
  }
  initializeForm() {
    this.petInforForm = this.fb.group({
      petRegistrationNo: new FormControl(''),
      petRegistrationTypeId: new FormControl(''),
      ownerName: new FormControl(''),
      dzongkhagId: new FormControl(''),
      gewogId: new FormControl(''),
      locality: new FormControl(''),
      mobileNumber: new FormControl(''),
      emailId: new FormControl(''),
      petName: new FormControl(''),
      microchipNumber: new FormControl(''),
      registrationDate: new FormControl(''),
      speciesId: new FormControl(''),
      speciesName: new FormControl(''),
      colour: new FormControl(''),
      distinguishingMark: new FormControl(''),
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
      villageId: new FormControl(''),
      cid: new FormControl(''),
      nationality: new FormControl(''),
      breed: new FormControl(''),
      petRegistrationNoOrMicrochip: new FormControl(''),
      neuterStatus: new FormControl(''),
      passportNumber: new FormControl(''),
      countryName: new FormControl(''),
      abandonedDate: new FormControl(''),
      ownerNames: new FormControl(''),
      ownerGewog: new FormControl(''),
      ownerCid: new FormControl(''),
      ownerVillageId: new FormControl(''),
      ownerDzongkhagId: new FormControl(''),
      ownerlocality: new FormControl(''),
      ownermobileNumber: new FormControl(''),
      owneremailId: new FormControl(''),
      village_name: new FormControl(''),
    });
  }
  populateForm() {
    this.visMasterService.loadOwnershipType().subscribe((response) => {
      this.ownershipTypes = response;
    });
    this.visMasterService.loadDzongkhag().subscribe((response) => {
      this.dzongkhags = response;
    });
    this.visMasterService.loadSpecies().subscribe((response) => {
      this.species = response;
    });
    this.visMasterService.loadCountry().subscribe((response) => {
      this.countrys = response;
    });
  }
  getGewogs(dzongkhagId: number) {
    this.visMasterService.getGewogs(dzongkhagId).subscribe((response) => {
      this.gewogs = response;
    });
  }
  getPetBreeds(speciesId: number) {
    this.visMasterService.getPetBreeds(speciesId).subscribe((response) => {
      this.petBreeds = response;
      if (speciesId === 7) {
        this.DontShowBarCodeImage = true;
      } else {
        this.DontShowBarCodeImage = false;
      }
    });
  }
  getVillage(gewogId: number) {
    this.visMasterService.getVillage(gewogId).subscribe((response) => {
      this.villages = response;
    });
  }
  petRegistrationId: number;
  petRegistrationNo: string;
  showCidForm: boolean;
  dontshowIT: boolean = false;

  showDzongkhagAddress: boolean = true;
  dewormngDetailsForPrinting: any;
  getPetRegistrationNumber() {
    this.petRegistrationNo = this.petInforForm.get('petRegistrationNoOrMicrochip').value;
    this.visMasterService.getPetRegistrationNumber(this.petRegistrationNo).subscribe((response) => {
      this.getDoc(this.petRegistrationNo);
      debugger;
      this.petRegistration = response;
      console.log('ffffffffff', response);
      this.dewormingDataForSending = response.dewormingDetails;
      this.vaccinationDataForSending = response.vaccinationDetails;
      this.dataSource.data = response.clinicalDetails;
      this.dataSource1.data = response.sterilizationDetails;

      if (response.dewormingDetails.length != 0) {
        var lengthOfMassDogDeworming = response.dewormingDetails.length;

        this.dataSource2.data = [response.dewormingDetails[lengthOfMassDogDeworming - 1]];
        this.dewormngDetailsForPrinting = [response.dewormingDetails[lengthOfMassDogDeworming - 1]];
      }
      // } else {
      //   this.dataSource2.data = [{ petRegistrationNumber: '', treatmentDate: '' }];
      // }
      //console.log(response.vaccinationDetails,"response.vaccinationDetails");

      // if (response.vaccinationDetails.length != 0) {
      //   var lengthOfMassDogVaccination = response.vaccinationDetails.length;
      //   this.dataSource3.data = [response.vaccinationDetails[lengthOfMassDogVaccination - 1]];
      // }

      var actualnationality;
      if (this.petRegistration.nationality == 1) {
        actualnationality = 'Bhutanese';
        this.showCidForm = true;
        this.nationality = true;
        this.showDzongkhagAddress = true;
      } else {
        actualnationality = 'Non-Bhutanese';
        this.nationality = false;
        this.showCidForm = false;
        this.showDzongkhagAddress = false;
      }
      var actualsex;
      if (this.petRegistration.sex === 'M') {
        actualsex = 'Male';
      } else {
        actualsex = 'Female';
      }

      if (this.petRegistration.neuterStatus === 'No') {
        this.neuterStatusFlag = true;
      } else {
        this.neuterStatusFlag = false;
      }
      if (this.petRegistration.microchipNumber !== '') {
        this.dontshowIT = true;
      } else {
        this.dontshowIT = false;
      }
      this.petInforForm.patchValue({
        ownerName: this.petRegistration.ownerName,
        registrationDate: this.petRegistration.registrationDate,
        dzongkhagId: this.petRegistration.dzongkhagName,
        gewogName: this.petRegistration.gewogName,
        sex: actualsex,
        emailId: this.petRegistration.emailId,
        microchipNumber: this.petRegistration.microchipNumber,
        speciesName: this.petRegistration.speciesName,
        petName: this.petRegistration.petName,
        breed: this.petRegistration.breed,
        colour: this.petRegistration.colour,
        distinguishingMark: this.petRegistration.distinguishingMark,
        year: this.petRegistration.year,
        day: this.petRegistration.day,
        month: this.petRegistration.month,
        nationality: actualnationality,
        receiptNumber: this.petRegistration.receiptNumber,
        locality: this.petRegistration.locality,
        mobileNumber: this.petRegistration.mobileNumber,
        villageName: this.petRegistration.villageName,
        cid: this.petRegistration.cid,
        passportNumber: this.petRegistration.passportNumber,
        petRegistrationNo: this.petRegistration.petRegistrationNumber,
        petRegistrationId: this.petRegistration.id,
        countryName: this.petRegistration.countryName,
        gewogId: this.petRegistration.gewogName,
        villageId: this.petRegistration.villageName,
        petBreeds: this.petRegistration.petBreedId,
        speciesId: this.petRegistration.speciesName,
        petRegistrationTypeId: this.petRegistration.ownerType,
        neuterStatus: this.petRegistration.neuterStatus,
        breederStatus: this.petRegistration.breederStatus,
        dateRenewal: this.petRegistration.dateRenewal,
        status: this.petRegistration.status,
        abandonedDate: this.petRegistration.abandonedDate,
      });
      this.getDoc(this.petRegistration.petRegistrationNumber);
      this.getGewogs(this.petRegistration.dzongkhagId);
      this.getVillage(this.petRegistration.gewogId);
      this.status(this.petRegistration.status);
      this.getOwnerDetails(this.petRegistration.petRegistrationNumber, this.petRegistration.microchipNumber);
      this.getOwnerDetailsodTranfer(this.petRegistration.petRegistrationNumber, this.petRegistration.microchipNumber);
      // this.viewDetailsForRegister(
      //   this.petRegistration.cid,

      // )
      this.getVaccinatationDetails(
        this.petRegistration.petRegistrationNumber,

        this.petRegistration.microchipNumber
      );
    });
    this.geOtherDetais();
  }
  getVaccinatationDetails(petRegistrationNo: string, microchipNumber: string) {
    this.visMasterService.getVaccinatationDetails(petRegistrationNo, microchipNumber).subscribe((res) => {
      this.vaccDetails = res;
      this.dataSource3.data = res;
    });
  }
  getOwnerDetailsodTranfer(petRegistrationNo: string, microchipNumber: string) {
    this.visMasterService.getOwnerDetailsodTranfer(petRegistrationNo, microchipNumber).subscribe((res) => {
      this.vaccDetails = res;
      this.dataSource5.data = res;
      console.log(res);
    });
  }

  getOwnerDetails(petRegistrationNo: string, microchipNumber: string) {
    this.visMasterService.getOwnerDetailsofDog(petRegistrationNo, microchipNumber).subscribe((res) => {
      this.vaccDetails = res;
      this.dataSource4.data = res;
      console.log(res, 'dddddd');
    });
  }
  status(status: string) {
    if (status === null || status === '') {
      this.petInforForm.patchValue({
        status: 'alive',
      });
    }
  }

  geOtherDetais() {}

  getDoc(petRegistrationNo: string) {
    this.imageShow = true;

    var docName = 'Photo';
    this.visMasterService.getDoc(petRegistrationNo, docName).subscribe((res) => {
      this.showingImage = res.imageByte;
    });
    this.getBarCode(petRegistrationNo);
  }
  barcodeshow: any;
  getBarCode(petRegistrationNo: string) {
    this.imageShow = true;
    //  this.DontShowBarCodeImage =false;
    var docName = 'BarCode';
    this.visMasterService.getDoc(petRegistrationNo, docName).subscribe((res) => {
      this.showingBarCode = res.imageByte;
      if (this.showingBarCode === null || this.showingBarCode === '') {
        this.barcodeshow = false;
      }
      if (this.showingBarCode) {
        this.barcodeshow = true;
      }
    });
  }

  print() {
    const dialogRef = this.dialog.open(PetHealthCertificateComponent, {
      width: '1000px',
      height: '700px',
      data: {
        actionType: 'PRINT',
        petRegistrationNo: this.petRegistrationNo,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }

  printPage() {
    const dialogRef = this.dialog.open(PetInfoPrintComponent, {
      width: '800px',
      height: '100%',
      data: {
        petInformation: this.petInforForm.value,
        deworming: this.dewormingDataForSending,
        vaccination: this.vaccinationDataForSending,
        image: this.showingImage,
        vaccDetails: this.vaccDetails,
        dewormngDetailsForPrinting: this.dewormngDetailsForPrinting,
      },
    });
  }
  // viewDetailsForRegister(dataOfOwner:any){
  //   const dialogRef = this.dialog.open(RegisterOwnerComponent, {
  //     width: '100%',
  //     height: '100%',
  //     position: { top: '5%', left: '20%' },
  //     data: {
  //       dataOfOwner: dataOfOwner,
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {});

  // }
  nationalitys: any;
  showDogDetails: boolean = false;
  ownerDetail: any;
  viewDetailsForRegister(cidNumber: number) {
    this.visMasterService.getOwnerDetailsofDogofRegister(cidNumber).subscribe((res) => {
      if (cidNumber == undefined) {
        cidNumber = 0;
      }
      this.ownerDetail = res;
      this.showDogDetails = true;
      this.nationalitys = this.ownerDetail.nationality == 1 ? 'Bhutanese' : 'Non-Bhutaneese';
      this.petInforForm.patchValue({
        ownerCid: res[0].cidNumber,
        owneremailId: res[0].emailId,
        ownerNames: res[0].ownerName,
        ownermobileNumber: res[0].mobileNumber,
        ownerDzongkhagId: res[0].dzongkhagName,
        ownerVillageId: res[0].village_name,
        ownerlocality: res[0].locality,
        ownerGewog: res[0].gewogName,
      });

      console.log(this.ownerDetail, 'ddddddd');
    });
  }
}
