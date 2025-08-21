import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@core';
import {
  AnimalTypes,
  Dzongkhags,
  Gewogs,
  OwnershipTypes,
  PetBreeds,
  Species,
  Villages,
} from '@app/master-management/models/master';
import { PetRegistration, PetRenwal, Country } from '@app/vis/shared/model/model';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
import { MasterService } from '@app/master-management/services/master.service';
import { ConfirmationDialogComponent } from '@app/@shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CredentialsService } from '@app/auth';
@Component({
  selector: 'app-ownership-transfer',
  templateUrl: './ownership-transfer.component.html',
  styleUrls: ['./ownership-transfer.component.scss'],
})
export class OwnershipTransferComponent implements OnInit {
  showingImage: any;
  showingBarCode: any;
  ownershipTransferForm: FormGroup;
  ownershipTypes: OwnershipTypes[];
  dzongkhags: Dzongkhags[];
  gewogs: Gewogs[];
  species: Species[];
  maxDate = new Date();
  petBreeds: PetBreeds[];
  petRegistration: PetRegistration;
  notificationService: any;
  petRegistrationId: number;
  petRegistrationNo: string;
  petRegistrationNumber: string;
  villages: Villages[];
  renewalDate: string;
  imageShow: boolean = false;
  nationality: boolean;
  nonbFlag: boolean = true;
  countrys: Country[];
  neuterStatusFlag: boolean;
  isReadOnly: boolean = true;
  editableShow: boolean = true;
  notEditableShow: boolean;
  userDetails: any;
  @Input() registrationDetails: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: MasterService,
    private visMasterservice: SharedService,
    private notification: NotificationService,
    private dialog: MatDialog,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.populateForm();
    this.ownershipTransferForm.patchValue({
      //nationality: 1,
    });
    this.nonbFlag == true;
  }

  populateForm() {
    this.service.loadAllUserDetails(this.credentialsService.credentials.userName).subscribe((res) => {
      this.userDetails = res;
      //  console.log(this.userDetails,"this.userDetails");
    });
    this.visMasterservice.loadOwnershipType().subscribe((response) => {
      this.ownershipTypes = response;
    });
    this.visMasterservice.loadDzongkhag().subscribe((response) => {
      this.dzongkhags = response;
    });
    this.visMasterservice.loadCountry().subscribe((response) => {
      this.countrys = response;
    });
    this.visMasterservice.loadSpecies().subscribe((response) => {
      this.species = response;
    });
    this.loadNationality(true);
  }
  cidValidation: boolean = true;
  loadNationality(event: true) {
    this.nationality = event;
  }
  changeNationality(event: MatRadioChange) {
    this.ownershipTransferForm.get('cid').setValue('');
    this.ownershipTransferForm.get('passportNumber').setValue('');
    this.ownershipTransferForm.get('ownerName').setValue('');
    this.ownershipTransferForm.get('mobileNumber').setValue('');
    this.nationality = Number(event.value) === 1;
    if (this.nationality == false) {
      this.showCidForm = false;
    } else {
      this.showCidForm = true;
    }
  }
  getCitizen(cid: number) {
    this.service.getCitizen(cid).subscribe(
      (response) => {
        this.ownershipTransferForm.patchValue({
          ownerName: response.fullName,
        });
      },
      () => {
        this.notification.openErrorSnackBar('');
      }
    );
  }
  dontShow: boolean;
  validateRoyal() {
    if (
      this.ownershipTransferForm.value.petRegistrationTypeId == 1 ||
      this.ownershipTransferForm.value.petRegistrationTypeId == 3
    ) {
      this.ownershipTransferForm.get('cid').setValue('');
      this.ownershipTransferForm.get('passportNumber').setValue('');
      this.ownershipTransferForm.get('ownerName').setValue('');
      this.ownershipTransferForm.get('mobileNumber').setValue('');
      this.cidValidation = false;
      this.nonbFlag = false;
      this.ownershipTransferForm.controls.cidNo.clearValidators();
      this.ownershipTransferForm.controls.ownerName.clearValidators();
      this.ownershipTransferForm.controls.cidNo.updateValueAndValidity();
      this.ownershipTransferForm.controls.ownerName.updateValueAndValidity();
    } else {
      this.nonbFlag = true;
      this.ownershipTransferForm.controls.cidNo.setValidators(Validators.required);
      this.ownershipTransferForm.controls.ownerName.setValidators(Validators.required);
    }

    if (this.ownershipTransferForm.value.petRegistrationTypeId == 1 || this.nationality == false) {
      this.isReadOnly = false;
      this.cidValidation = false;
      this.dontShow = false;
    } else {
      this.isReadOnly = true;
      this.cidValidation = true;
      this.dontShow = true;
    }
  }

  validateYear(type: any) {
    if (type == 'year') {
      if (this.ownershipTransferForm.value.year > 100 || this.ownershipTransferForm.value.year == 0) {
        this.ownershipTransferForm.get('year').reset();
      }
    }

    if (type == 'month') {
      if (this.ownershipTransferForm.value.month > 11 || this.ownershipTransferForm.value.month == 0) {
        this.ownershipTransferForm.get('month').reset();
      }
    }

    if (type == 'day') {
      if (this.ownershipTransferForm.value.day > 29 || this.ownershipTransferForm.value.day == 0) {
        this.ownershipTransferForm.get('day').reset();
      }
    }
  }

  getGewogs(dzongkhagId: number) {
    this.visMasterservice.getGewogs(dzongkhagId).subscribe((response) => {
      this.gewogs = response;
    });
  }
  getVillage(gewogId: number) {
    this.visMasterservice.getVillage(gewogId).subscribe((response) => {
      this.villages = response;
    });
  }

  getPetBreeds(speciesId: number) {
    this.visMasterservice.getPetBreeds(speciesId).subscribe((response) => {
      this.petBreeds = response;
    });
  }

  initializeForm() {
    this.ownershipTransferForm = this.fb.group({
      petRegistrationTypeId: new FormControl(''),
      petRegistrationNo: new FormControl(''),
      petRegistrationNoOrMicrochip: new FormControl('', Validators.required),
      registrationDate: new FormControl(''),
      national: new FormControl(''),
      cidNo: new FormControl('', Validators.required),
      dzongkhagName: new FormControl(''),
      gewogName: new FormControl(''),
      localityTransfer: new FormControl(''),
      microchipNumber: new FormControl(''),
      speciesName: new FormControl(''),
      colour: new FormControl(''),
      distinguishingMark: new FormControl(''),
      sex: new FormControl(''),
      dateRenewal: new FormControl(''),
      receiptNumber: new FormControl(''),
      dayTransfer: new FormControl(''),
      monthTransfer: new FormControl(''),
      yearTransfer: new FormControl(''),
      breed: new FormControl(''),
      villageName: new FormControl(''),
      cid: new FormControl(''),
      showingImage: new FormControl(''),
      status: new FormControl(''),
      neuterStatus: new FormControl(),
      countryId: new FormControl('', Validators.required),
      ownerName: new FormControl(''),
      dzongkhagId: new FormControl(''),
      gewogId: new FormControl(''),
      villageId: new FormControl(''),
      nationality: new FormControl(''),
      locality: new FormControl(''),
      passportNumber: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', []),
      emailId: new FormControl(''),
      petName: new FormControl(''),
      day: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
      breederStatus: new FormControl(''),
      transferDate: new FormControl('', Validators.required),
    });
  }
  dontshowIT: boolean = false;
  showCidForm: boolean = true;

  getPetRegistrationNumber() {
    this.petRegistrationNo = this.ownershipTransferForm.get('petRegistrationNoOrMicrochip').value;
    this.visMasterservice.getPetRegistrationNumber(this.petRegistrationNo).subscribe((response) => {
      var actualsex;
      if (response.sex === 'M') {
        actualsex = 'Male';
      } else {
        actualsex = 'Female';
      }

      this.getDoc(this.petRegistrationNo);
      if (this.getBarCode && this.getDoc) {
        this.dontShow = true;
      } else {
        this.dontShow = false;
      }

      this.petRegistration = response;
      var actualnationality;

      if (this.petRegistration.neuterStatus === 'Yes') {
        this.editableShow = false;
        this.notEditableShow = true;
      } else {
        this.editableShow = true;
        this.notEditableShow = false;
      }

      if (this.petRegistration.neuterStatus === 'Yes') {
        this.editableShow = false;
        this.notEditableShow = true;
      } else {
        this.editableShow = true;
        this.notEditableShow = false;
      }

      var actualnationality;
      // console.log(this.petRegistration.nationality, this.petRegistration.nationality);

      if (this.petRegistration.nationality == 1) {
        actualnationality = 'Bhutanese';
        this.nationality = true;
        this.showCidForm = true;
      } else {
        actualnationality = 'Non-Bhutanese';
        this.nationality = false;
        this.showCidForm = false;
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
      this.ownershipTransferForm.patchValue({
        registrationDate: this.petRegistration.registrationDate,
        dzongkhagName: this.petRegistration.dzongkhagName,
        gewogName: this.petRegistration.gewogName,
        emailId: this.petRegistration.emailId,
        dzongkhagId: this.petRegistration.dzongkhagId,
        petRegistrationTypeId: this.petRegistration.petRegistrationTypeId,
        gewogId: this.petRegistration.gewogId,
        villageId: this.petRegistration.villageId,
        countryId: this.petRegistration.countryId,
        microchipNumber: this.petRegistration.microchipNumber,
        speciesName: this.petRegistration.speciesName,
        petName: this.petRegistration.petName,
        breed: this.petRegistration.breed,
        colour: this.petRegistration.colour,
        distinguishingMark: this.petRegistration.distinguishingMark,
        year: this.petRegistration.year,
        day: this.petRegistration.day,
        month: this.petRegistration.month,
        sex: actualsex,
        cid: this.petRegistration.cid,
        passportNumber: this.petRegistration.passportNumber,
        ownerName: this.petRegistration.ownerName,
        receiptNumber: this.petRegistration.receiptNumber,
        locality: this.petRegistration.locality,
        mobileNumber: this.petRegistration.mobileNumber,
        petRegistrationNo: this.petRegistration.petRegistrationNumber,
        petRegistrationId: this.petRegistration.id,
        dateRenewal: this.petRegistration.dateRenewal,
        neuterStatus: this.petRegistration.neuterStatus,
        breederStatus: this.petRegistration.breederStatus,
        nationality: this.petRegistration.nationality,
        status: this.petRegistration.status,
      });
      this.getDoc(this.petRegistration.petRegistrationNumber);
      this.getGewogs(this.petRegistration.dzongkhagId);
      this.getVillage(this.petRegistration.gewogId);
    });
  }

  updatePetRegistration() {
    if (this.ownershipTransferForm.value.nationality == 1) {
      if (this.ownershipTransferForm.value.petRegistrationTypeId != 1) {
        if (this.ownershipTransferForm.value.cid == '') {
          this.notification.openErrorSnackBar('Enter required fields');
          return;
        }
      }
    } else {
      if (this.ownershipTransferForm.value.passportNumber == '') {
        this.notification.openErrorSnackBar('Enter required fields');
        return;
      }
    }

    if (
      this.ownershipTransferForm.value.ownerName == '' ||
      this.ownershipTransferForm.value.mobileNumber == '' ||
      this.ownershipTransferForm.value.dzongkhagId == '' ||
      this.ownershipTransferForm.value.transferDate == '' ||
      this.ownershipTransferForm.value.gewogId == ''
    ) {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    }
    const petregistration = new PetRenwal();
    petregistration.petRegistrationNumber = this.petRegistration.petRegistrationNumber;
    petregistration.petRegistrationId = this.petRegistration.id;
    Object.assign(petregistration, this.ownershipTransferForm.value);
    petregistration.petBreedId = this.petRegistration.petBreedId;
    petregistration.speciesId = this.petRegistration.speciesId;

    petregistration.userName = this.userDetails.userName;
    petregistration.centreId = this.userDetails.centre.id;
    petregistration.levelUserId = this.userDetails.levelUser.id;
    petregistration.jurisdiction = this.userDetails.jurisdiction;
    petregistration.fullName = this.userDetails.fullName;
    if (this.petRegistration.sex == 'Male') {
      petregistration.sex = 'M';
    } else {
      petregistration.sex = 'F';
    }
    petregistration.petRegistrationTypeId = this.ownershipTransferForm.get('petRegistrationTypeId').value;
    if (
      (this.ownershipTransferForm.value.nationality == 2 && this.ownershipTransferForm.value.passportNumber === '') ||
      this.ownershipTransferForm.value.countryId === ''
    ) {
      this.notification.openErrorSnackBar('Enter required fields');
      return;
    }
    if (this.ownershipTransferForm.value.mobileNumber.length < 8) {
      this.notification.openErrorSnackBar('Enter Valid Mobile Number');
    } else {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: {
          title: 'Confirmation',
          message: 'Do you want to transfer?',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.visMasterservice.updatePetRegistration(petregistration).subscribe(
            () => {
              this.notification.openSuccessSnackBar(' Transferred Successfully ');
              this.router.navigate(['/', 'dashboard']);
            },
            () => {
              this.notification.openErrorSnackBar('Could not be transferred');
            }
          );
        } else {
          dialogRef.close();
        }
      });
    }
  }

  array(len: number): number[] {
    return new Array(len);
  }

  getDoc(petRegistrationNo: string) {
    var docName = 'Photo';
    this.visMasterservice.getDoc(petRegistrationNo, docName).subscribe((res) => {
      this.showingImage = res.imageByte;
      if (this.showingImage) {
        this.imageShow = true;
      } else {
        this.notification.openErrorSnackBar('Couldnot be Updated');
        return;
      }
    });
    this.getBarCode(petRegistrationNo);
  }
  barcodeshow: boolean = false;
  getBarCode(petRegistrationNo: string) {
    var docName = 'BarCode';
    this.visMasterservice.getDoc(petRegistrationNo, docName).subscribe((res) => {
      this.showingBarCode = res.imageByte;

      if (this.showingBarCode === null || this.showingBarCode === '') {
        this.barcodeshow = false;
      }
      if (this.showingBarCode) {
        this.barcodeshow = true;
      }
      // if (this.showingBarCode) {
      //   this.dodntShow = true;
      // } else {
      //   this.imageShow = false;
      //   return;
      // }
    });
  }

  printPage() {
    window.print();
  }
  validateNeatus() {
    if (this.ownershipTransferForm.value.neuterStatus === 'Yes') {
      this.neuterStatusFlag = false;
    }
  }
}
